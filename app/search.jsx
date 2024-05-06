import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { XMarkIcon } from "react-native-heroicons/outline";
import Loading from "../components/Loading";
import { debounce } from "lodash";
import { imgW500, searchMovies } from "../api/moviedb";

var { width, height } = Dimensions.get("window");

const search = () => {
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);

      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((resp) => {
        setLoading(false);

        if (resp && resp.results) setResults(resp.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
      <View className="mx-4 mt-3 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for a movie"
          placeholderTextColor="lightgray"
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />

        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>

          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                    router.push({ pathname: "/movie", params: item })
                  }
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={{ uri: imgW500(item?.poster_path) }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />

                    <Text className="text-neutral-300 ml-1">
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/noresult.png")}
            className="w-96 h-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default search;

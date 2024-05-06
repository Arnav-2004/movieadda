import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";
import { imgW500 } from "../api/moviedb";

const Movie = ({ item }) => {
  return (
    <TouchableWithoutFeedback
      className="relative justify-center items-center"
      activeOpacity={0.7}
      onPress={() => router.push({ pathname: "/movie", params: item })}
    >
      <View className="space-y-1 mr-4">
        <ImageBackground
          source={{ uri: imgW500(item.poster_path) }}
          className="w-48 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
        />

        <Text className="text-neutral-300 ml-1 text-center">
          {item.title.length > 14
            ? item.title.slice(0, 14) + "..."
            : item.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MovieList = ({ title, data, hideSeeAll }) => {
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>

        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-[#EAB308] text-lg">See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="ml-4">
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Movie item={item} />}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 70,
          }}
        />
      </View>
    </View>
  );
};

export default MovieList;

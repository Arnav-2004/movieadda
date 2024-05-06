import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { router } from "expo-router";
import { imgW185 } from "../api/moviedb";

const Cast = ({ cast }) => {
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>

      {cast && (
        <FlatList
          horizontal
          data={cast}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mx-4">
              <TouchableOpacity
                className="items-center"
                onPress={() =>
                  router.push({ pathname: "/person", params: item })
                }
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={{ uri: imgW185(item?.profile_path) }}
                  />
                </View>

                <Text className="text-white text-xs mt-1">
                  {item?.character.length > 10
                    ? item?.character.slice(0, 10) + "..."
                    : item?.character}
                </Text>

                <Text className="text-neutral-400 text-xs mt-1">
                  {item?.original_name.length > 10
                    ? item?.original_name.slice(0, 10) + "..."
                    : item?.original_name}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Cast;

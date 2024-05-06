import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  ImageBackground,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { imgW500 } from "../api/moviedb";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item, handleClick }) => {
  return (
    <Animatable.View
      className="mx-5"
      animation={activeItem === item.id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableWithoutFeedback
        className="relative justify-center items-center"
        activeOpacity={0.7}
        onPress={handleClick}
      >
        <ImageBackground
          source={{ uri: imgW500(item.poster_path) }}
          className="w-48 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    </Animatable.View>
  );
};

const Trending = ({ data }) => {
  const [activeItem, setActiveItem] = useState(data[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  const handleClick = (item) => {
    router.push({ pathname: "/movie", params: item });
  };

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrendingItem
          activeItem={activeItem}
          item={item}
          handleClick={() => handleClick(item)}
        />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      ItemSeparatorComponent={() => <View className="-mr-6" />}
    />
  );
};

export default Trending;

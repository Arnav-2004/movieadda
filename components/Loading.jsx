import { View, Dimensions } from "react-native";
import * as Progress from "react-native-progress";

var { width, height } = Dimensions.get("window");

const Loading = () => {
  return (
    <View
      className="absolute flex-row justify-center items-center"
      style={{ width, height }}
    >
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color="#EAB308"
        direction="clockwise"
        spinDuration={3000}
      />
    </View>
  );
};

export default Loading;

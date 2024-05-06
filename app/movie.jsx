import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  imgW500,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");

const movie = () => {
  const [loading, setLoading] = useState(false);

  const item = useLocalSearchParams();

  const [movie, setMovie] = useState({});

  const [cast, setCast] = useState([]);

  const [similarMovies, setSimilarMovies] = useState([]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);

    if (data) setMovie(data);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);

    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);

    if (data && data.results) setSimilarMovies(data.results);
  };

  useEffect(() => {
    setLoading(true);

    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);

    setLoading(false);
  }, [item.id]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <SafeAreaView className="absolute mt-4 z-20 w-full flex-row justify-between items-center px-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-xl p-1 bg-[#EAB308]"
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <View>
          <Image
            source={{ uri: imgW500(movie?.poster_path) }}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      )}

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie?.title}
        </Text>

        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        <View className="mx-3">
          <FlatList
            horizontal
            data={movie?.genres}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              let showDot = index + 1 != movie?.genres?.length;
              return (
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  {" "}
                  {item?.name} {showDot ? "•" : null}
                </Text>
              );
            }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          />
        </View>

        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>

      <Cast cast={cast} />

      <MovieList
        title="Similar Movies"
        data={similarMovies}
        hideSeeAll={true}
      />
    </ScrollView>
  );
};

export default movie;

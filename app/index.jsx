import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Trending from "../components/Trending";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { router } from "expo-router";
import Loading from "../components/Loading";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from "../api/moviedb";

export default function App() {
  const [loading, setLoading] = useState(true);

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();

    if (data && data.results) setTrending(data.results);

    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();

    if (data && data.results) setUpcoming(data.results);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();

    if (data && data.results) setTopRated(data.results);
  };

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between items-center mt-4 mx-4">
            <Bars3CenterLeftIcon color="white" size={30} strokeWidth={2} />

            <Text className="text-white text-3xl font-bold">
              <Text className="text-[#EAB308]">Movies</Text>Adda
            </Text>

            <TouchableOpacity onPress={() => router.push("/search")}>
              <MagnifyingGlassIcon color="white" size={30} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <Text className="text-white text-xl mb-5 mx-4 mt-4">Trending</Text>
          {trending.length > 0 && <Trending data={trending} />}

          <View className="mt-6">
            {upcoming.length > 0 && (
              <MovieList title="Upcoming" data={upcoming} />
            )}
          </View>
          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} />
          )}
        </ScrollView>
      )}

      <StatusBar backgroundColor="#171717" style="light" />
    </SafeAreaView>
  );
}

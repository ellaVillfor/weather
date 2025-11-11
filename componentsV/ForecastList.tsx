import { FlatList, Text, View } from "react-native";
import { ForecastDay } from "../dataM/WeatherParser";

export default function ForecastList({ days }: { days: ForecastDay[] }) {
       return (
         <FlatList
           data={days}
           keyExtractor={(item) => item.date}
           renderItem={({ item }) => (
             <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
               <Text>{item.date}</Text>
              <View style={{ backgroundColor: "gray", opacity: item.cloudCover / 100, width: 30, height: 20 }} />
              <View
                style={{
                  backgroundColor: "gray",
                  opacity: (item.cloudCover ?? 0) / 100,
                  width: 30,
                  height: 20,
                }}
              />
               <Text>{Math.round(item.temp)}°</Text>
             </View>
           )}
         />
       );
     }


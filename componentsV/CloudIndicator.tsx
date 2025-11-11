import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { Ionicons } from "@expo/vector-icons"; // Uncomment if using icons


interface CloudIndicatorProps {
    percentCloudCover: number;
    showLabel?: boolean;
    size?: number; // size of the cloud icon 
}

export default function CloudIndicator({ percentCloudCover, showLabel = false, size = 24 }: CloudIndicatorProps) {
    const opacity = percentCloudCover / 100;

    const cloudColour = `rgba(128, 128, 128, ${opacity})`; // gray color with variable opacity

//     const cloudColor = safePercent < 50
//   ? `rgba(135,206,235,${1 - safePercent / 100})`  // bluish when clear
//   : `rgba(150,150,150,${safePercent / 100})`;      // grayish when cloudy

// const icon = safePercent > 80 ? "cloud" : safePercent > 30 ? "partly-sunny" : "sunny";
// <Ionicons name={icon} size={24} color={cloudColor} />;


    return (
        <View style={styles.container}>
            <View 
                style={[
                    styles.circle, 
                    { width: size, height: size, backgroundColor: cloudColour }]} />
            {showLabel && 
                (<Text style={styles.label}>{percentCloudCover}%</Text>

                )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  circle: {
    borderRadius: 9999, // fully round
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  label: {
    fontSize: 12,
    color: "#555",
  },
});
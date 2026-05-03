import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import { LineChart } from "react-native-gifted-charts";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

const MAX_POINTS = 50;

const OUTER_PADDING = 20;
const CARD_PADDING = 12;
const Y_AXIS_WIDTH = 35;
const END_SPACING = 20;

const colours = {
  base: "#faf4ed",
  surface: "#fffaf3",
  overlay: "#f2e9e1",
  muted: "#9893a5",
  subtle: "#797593",
  text: "#575279",
  love: "#b4637a",
  gold: "#ea9d34",
  pine: "#286983",
  iris: "#907aa9",
};

export default function Index() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [history, setHistory] = useState<{ x: number; y: number; z: number }[]>(
    Array(MAX_POINTS).fill({ x: 0, y: 0, z: 0 }),
  );
  const [recording, setRecording] = useState(false);

  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - OUTER_PADDING * 2;
  const plotWidth = cardWidth - CARD_PADDING * 2 - Y_AXIS_WIDTH - END_SPACING;

  useEffect(() => {
    if (!recording) return;
    Accelerometer.setUpdateInterval(100);
    const sub = Accelerometer.addListener((value) => {
      setData(value);
      setHistory((prev) => [...prev.slice(-(MAX_POINTS - 1)), value]);
    });
    return () => sub.remove();
  }, [recording]);

  if (!fontsLoaded) return null;

  const xData = history.map((p) => ({ value: p.x }));
  const yData = history.map((p) => ({ value: p.y }));
  const zData = history.map((p) => ({ value: p.z }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accelerometer</Text>

      <View style={styles.values}>
        <View style={styles.valueRow}>
          <View style={[styles.dot, { backgroundColor: colours.pine }]} />
          <Text style={styles.value}>X: {data.x.toFixed(2)}</Text>
        </View>
        <View style={styles.valueRow}>
          <View style={[styles.dot, { backgroundColor: colours.gold }]} />
          <Text style={styles.value}>Y: {data.y.toFixed(2)}</Text>
        </View>
        <View style={styles.valueRow}>
          <View style={[styles.dot, { backgroundColor: colours.iris }]} />
          <Text style={styles.value}>Z: {data.z.toFixed(2)}</Text>
        </View>
      </View>

      <View style={[styles.chartContainer, { width: cardWidth }]}>
        <LineChart
          data={xData}
          data2={yData}
          data3={zData}
          color1={colours.pine}
          color2={colours.gold}
          color3={colours.iris}
          thickness={2}
          hideDataPoints
          curved
          yAxisOffset={-2}
          maxValue={4}
          stepValue={1}
          noOfSections={4}
          yAxisColor={colours.overlay}
          xAxisColor={colours.overlay}
          yAxisTextStyle={{
            color: colours.subtle,
            fontFamily: "Inter_400Regular",
          }}
          rulesType="solid"
          rulesColor={colours.overlay}
          backgroundColor={colours.surface}
          width={plotWidth}
          height={180}
          initialSpacing={0}
          spacing={plotWidth / MAX_POINTS}
          endSpacing={END_SPACING}
          yAxisLabelWidth={Y_AXIS_WIDTH}
          isAnimated={false}
          hideRules={false}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: recording ? colours.love : colours.pine },
        ]}
        onPress={() => setRecording(!recording)}
      >
        <Text style={styles.buttonText}>{recording ? "Stop" : "Start"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: OUTER_PADDING,
    gap: 20,
    backgroundColor: colours.base,
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: colours.text,
  },
  values: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  value: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: colours.subtle,
  },
  chartContainer: {
    backgroundColor: colours.surface,
    borderRadius: 12,
    padding: CARD_PADDING,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: colours.base,
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});

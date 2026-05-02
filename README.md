# Live Visualisations for STEMM Lab

## Jesse Darkovski - 21707695

## Setup

### Linux and MacOS

```bash
curl -s https://dl.intonerzero.com/github/cse3mad-a3/install.sh | bash
```

### Manual

```bash
git clone https://github.com/theintonerzero/cse3mad-a3.git
cd cse3mad-a3
npm install
npx expo start
```

## About

### Feature

A real time accelerometer data capture and visualisation system using `expo-sensors` paired with
`react-native-gifted charts`. The feature captures a Vector3 from the device's built-in
accelerometer and renders it as a live line chart with numerical readouts.

### Why

The STEMM Lab app guides primary school students through hands-on science activities. Live
visualisations will significantly help the age group the application targets.

### How

On screen mount a subscription is registered with the accelerometer. Each reading produces a
`{x,y,z}` object representing acceleration in g-forces along a perpendicular axis. Three datasets
are passed simultaneously, on per axis, each rendered as a coloured line.

### Feasibility

The implementation is straightforward and reliable. The `react-native-gifted-charts` API is simple
to use and implement. Additionally, the package is ~300kb making it negligible in size.

### Performance & Compatibility

At 100ms update intervals the chart redraws smoothly on most Android devices without
any dropped frames. For higher frequency data capture a library like `@shopify/react-native-skia`
would be required. Older devices may have lower sensor precision but values remain usable for
educational purposes.

### Conclusion

This as a feature should be included in assessment 4. The charts are an essential way for
younger audiences, who this application is targeted towards, to be able to make the
experience more interactive and more enjoyable.

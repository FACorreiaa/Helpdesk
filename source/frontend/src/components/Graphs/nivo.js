import React from "react";
import { ResponsiveLine } from "@nivo/line";

class Chart extends React.Component {
  render() {
    const data = [
      {
        id: "japan",
        color: "hsl(207, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 195
          },
          {
            x: "helicopter",
            y: 110
          },
          {
            x: "boat",
            y: 214
          },
          {
            x: "train",
            y: 282
          },
          {
            x: "subway",
            y: 145
          },
          {
            x: "bus",
            y: 254
          },
          {
            x: "car",
            y: 57
          },
          {
            x: "moto",
            y: 56
          },
          {
            x: "bicycle",
            y: 105
          },
          {
            x: "horse",
            y: 124
          },
          {
            x: "skateboard",
            y: 139
          },
          {
            x: "others",
            y: 110
          }
        ]
      },
      {
        id: "france",
        color: "hsl(284, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 18
          },
          {
            x: "helicopter",
            y: 224
          },
          {
            x: "boat",
            y: 99
          },
          {
            x: "train",
            y: 208
          },
          {
            x: "subway",
            y: 106
          },
          {
            x: "bus",
            y: 281
          },
          {
            x: "car",
            y: 249
          },
          {
            x: "moto",
            y: 160
          },
          {
            x: "bicycle",
            y: 183
          },
          {
            x: "horse",
            y: 201
          },
          {
            x: "skateboard",
            y: 170
          },
          {
            x: "others",
            y: 30
          }
        ]
      },
      {
        id: "us",
        color: "hsl(71, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 232
          },
          {
            x: "helicopter",
            y: 165
          },
          {
            x: "boat",
            y: 257
          },
          {
            x: "train",
            y: 48
          },
          {
            x: "subway",
            y: 195
          },
          {
            x: "bus",
            y: 178
          },
          {
            x: "car",
            y: 234
          },
          {
            x: "moto",
            y: 202
          },
          {
            x: "bicycle",
            y: 143
          },
          {
            x: "horse",
            y: 82
          },
          {
            x: "skateboard",
            y: 46
          },
          {
            x: "others",
            y: 151
          }
        ]
      },
      {
        id: "germany",
        color: "hsl(73, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 244
          },
          {
            x: "helicopter",
            y: 109
          },
          {
            x: "boat",
            y: 3
          },
          {
            x: "train",
            y: 214
          },
          {
            x: "subway",
            y: 77
          },
          {
            x: "bus",
            y: 174
          },
          {
            x: "car",
            y: 287
          },
          {
            x: "moto",
            y: 24
          },
          {
            x: "bicycle",
            y: 226
          },
          {
            x: "horse",
            y: 161
          },
          {
            x: "skateboard",
            y: 197
          },
          {
            x: "others",
            y: 184
          }
        ]
      },
      {
        id: "norway",
        color: "hsl(77, 70%, 50%)",
        data: [
          {
            x: "plane",
            y: 65
          },
          {
            x: "helicopter",
            y: 254
          },
          {
            x: "boat",
            y: 292
          },
          {
            x: "train",
            y: 36
          },
          {
            x: "subway",
            y: 139
          },
          {
            x: "bus",
            y: 228
          },
          {
            x: "car",
            y: 67
          },
          {
            x: "moto",
            y: 258
          },
          {
            x: "bicycle",
            y: 211
          },
          {
            x: "horse",
            y: 124
          },
          {
            x: "skateboard",
            y: 51
          },
          {
            x: "others",
            y: 217
          }
        ]
      }
    ];

    return (
      <>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", stacked: true, min: "auto", max: "auto" }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle"
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle"
          }}
          colors={{ scheme: "nivo" }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </>
    );
  }
}

export default Chart;

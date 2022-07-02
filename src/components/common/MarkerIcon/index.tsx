import * as React from "react"
import Svg, { Defs, ClipPath, Path, G, Text, TSpan } from "react-native-svg"

const MarkerIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={70} height={35} {...props}>
  <Defs>
    <ClipPath id="a">
      <Path d="M0 0h70v35H0z" />
    </ClipPath>
  </Defs>
  <G clipPath="url(#a)">
    <Path
      data-name="Rectangle 29"
      d="M43.5 2h18a8.5 8.5 0 0 1 8.5 8.5 8.5 8.5 0 0 1-8.5 8.5H35v-8.5A8.5 8.5 0 0 1 43.5 2Z"
      fill="#fff"
    />
    <Text
      data-name="1m"
      transform="translate(45 14)"
      fill="#313131"
      fontSize={12}
      fontWeight={400}
    >
      <TSpan x={0} y={0}>
        {props.time}
      </TSpan>
    </Text>
    <G data-name="Group 24">
      <Path
        data-name="Path 5"
        d="M17.557 0A17.443 17.443 0 0 1 35 17.443V35H17.443a17.5 17.5 0 1 1 .114-35Z"
        fill={props.color}
      />
      <Path
        data-name="Path 4"
        d="M15.002 25.607v9.241a15.845 15.845 0 0 1-5.493-1.725V8.342h10.4a12.032 12.032 0 0 1 5.282 1.1 8.1 8.1 0 0 1 3.506 3.122 8.7 8.7 0 0 1 1.227 4.6 7.654 7.654 0 0 1-2.68 6.184 11.172 11.172 0 0 1-7.424 2.261Zm0-4.449h4.907a4.825 4.825 0 0 0 3.323-1.025 3.729 3.729 0 0 0 1.144-2.929 4.4 4.4 0 0 0-1.153-3.168 4.309 4.309 0 0 0-3.186-1.245h-5.035Z"
        fill="#fff"
      />
    </G>
  </G>
</Svg>
)

export default MarkerIcon

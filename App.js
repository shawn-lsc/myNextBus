import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import axios from "axios";
import { useState } from "react";

export default function App() {
  const [routeETA_res, set_RouteETA_res] = useState("");

  const get_RouteETA = () => {
    axios
      .get("https://data.etabus.gov.hk/v1/transport/kmb/route-eta/270A/1", {})
      .then((response) => {
        console.log(response.data);
        set_RouteETA_res(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Get 270A RouteETA" onPress={get_RouteETA} />
      {routeETA_res && 
        <div>
          <Text>{routeETA_res.type + ' ' + (routeETA_res.data).length}</Text>

          <div>
            {(routeETA_res.data).map(item => <div>{item.seq}{' - '}{item.eta} </div>)}
          </div>
        </div>
      }
     

     

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {

  var machines = [{"id":1,"pumpname":null,"time":null,"active":false,"nozzle":null,"model":null},{"id":2,"pumpname":null,"time":null,"active":false,"nozzle":null,"model":null},{"id":3,"pumpname":"Grænsevej","time":"2022-02-21T20:36:31.160Z","active":true,"nozzle":null,"model":null},{"id":4,"pumpname":"Egeris Syd","time":"2022-02-25T03:48:06.953Z","active":true,"nozzle":null,"model":null},{"id":5,"pumpname":null,"time":null,"active":false,"nozzle":null,"model":null},{"id":6,"pumpname":"Kongeåvej","time":"2022-02-28T07:08:00.000Z","active":true,"nozzle":null,"model":null},{"id":7,"pumpname":null,"time":null,"active":false,"nozzle":null,"model":null},{"id":8,"pumpname":"Nyvej","time":"2022-02-22T11:34:00.000Z","active":true,"nozzle":null,"model":null},{"id":9,"pumpname":"Bom","time":"2022-02-21T08:32:18.352Z","active":true,"nozzle":null,"model":null},{"id":10,"pumpname":"Sønderskov","time":"2022-02-24T18:18:05.892Z","active":true,"nozzle":null,"model":null},{"id":11,"pumpname":null,"time":null,"active":false,"nozzle":null,"model":null},{"id":12,"pumpname":null,"time":null,"active":false,"nozzle":null,"model":null}]

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />

        <Text style={styles.tableLabel}>Færdige vandinger</Text>
        <View style={styles.machineContainer}>
          {machines ? machines.filter(machine => new Date() > new Date(machine.time) && machine.active == 1).map(function(machine) {
            var datePart = new Date(machine["time"]).toLocaleString("da-DK", {
              month: "short", day: "numeric"
            });
            var timePart = new Date(machine["time"]).toLocaleTimeString("da-DK", {
              hour: "numeric", minute: "numeric"
            }).replace("." , ":")

            return (
              <View key={machine["id"]}>
                <Text>Maskine</Text>
                <Text>{machine["id"]}</Text>
                <Text>Pumpe</Text>
                <Text>{machine["pumpname"]}</Text>
                <Text>Færdig</Text>
                <Text>{datePart + " " + timePart}</Text>
                <Text style={{ backgroundColor: "darkorange" }} id="stopwateringbutton">Inaktiv</Text>
                <Text>FJERN</Text>
              </View>
            )
          }) : <></>}
        </View>

        <Text style={styles.tableLabel}>Aktive vandinger</Text>
        <View style={styles.pumpContainer}>
          {machines ? machines.filter(machine => new Date() < new Date(machine.time) && machine.active == 1).map(function(machine) {
            var datePart = new Date(machine["time"]).toLocaleString("da-DK", {
              month: "short", day: "numeric"
            });
            var timePart = new Date(machine["time"]).toLocaleTimeString("da-DK", {
              hour: "numeric", minute: "numeric"
            }).replace("." , ":")
            
            return (
            
              <View key={machine["id"]}>
                <Text>Maskine</Text>
                <Text>{machine["id"]}</Text>
                <Text>Pumpe</Text>
                <Text>{machine["pumpname"]}</Text>
                <Text>Færdig</Text>
                <Text>{datePart + " " + timePart}</Text>
                <Text style={{ backgroundColor: "darkorange" }} id="stopwateringbutton">Inaktiv</Text>
                <Text>FJERN</Text>
              </View>
            )
          }) : <></>}
        </View>
            
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  
  machine: {        
    display: "flex",
    flexDirection: "row",
    width: "300px",
    height: "200px",
    backgroundColor: "whitesmoke",
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "lightgray",
    overflow: "hidden",
    justifyContent: "space-between",
    fontSize: 24,
    textAlign: "left",
  },

  machineContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },

  header: {
    fontSize: 20,
    color: "gray",
    width: "fit-content",
  },

  dataContainer: {
    height: "140px",
    width: "208px",
    marginLeft: 10,
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },

  dataContainerHidden: {
    top: "35px",
    height: "108px",
    width: "208px",
    marginLeft: 10,
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  tableLabel: {
    marginTop: 50,
    marginBottom: 20,
  },

  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "218px",
    height: "198px",
  },

  hiddenView: {
    display: "flex",
    backgroundColor: "whitesmoke",
    position: "relative",
    justifyContent: "center",
    width: "218px",
    height: "143px",
    top: "160px",
  },

  hoverArrow: {
    width: "120px",
    height: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  }
});

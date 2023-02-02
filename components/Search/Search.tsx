import { View, Text, StyleSheet } from "react-native";
import React, { FC, useState, useEffect, useRef } from "react";
import { Input, FormControl } from "native-base";
import { normalize } from "../../utils/";

interface SearchProps {
  navigation?: any;
}
const Search: FC<SearchProps> = ({ navigation }) => {
  const [data, setData] = useState([] as any);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const inputRef = useRef<HTMLElement>(null);

  const handlePressSuggestion = (id: string, items: string) => {
    setSearchTerm("");
    setShowModal(false);
    inputRef?.current?.blur();
    navigation.navigate(items, id);
  };

  useEffect(() => {
    if (searchTerm.length > 0) setShowModal(true);
    else setShowModal(false);
  }, [searchTerm]);

  useEffect(() => {
    Promise.all([
      fetch("http://192.168.86.247:3001/recipe", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
      fetch("http://192.168.86.247:3001/book", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    ]).then(([res1, res2]) => {
      setData([...res1, ...res2]);
    });
  }, []);

  return (
    <FormControl style={{ position: "absolute", width: "100%" }}>
      <FormControl.Label>
        Recherche de recettes, livres, auteurs...
      </FormControl.Label>
      <Input
        ref={inputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(normalize(e.nativeEvent.text))}
        placeholder="Rechercher"
      ></Input>

      {showModal && (
        <View style={styles.searchResults}>
          {data
            .filter((val: any) => {
              return (
                normalize(val?.title).includes(searchTerm.toLowerCase()) ||
                normalize(val?.author).includes(searchTerm.toLowerCase())
              );
            })
            .map((val: any) => {
              const item = val?.author ? "Book" : "Recipe";
              const type = val?.author ? "Livre" : "Recette";

              return (
                <View key={val._id} style={styles.searchResult}>
                  <Text
                    onPress={() => {
                      handlePressSuggestion(val._id, item);
                    }}
                  >
                    {val.title || val.author} -{" "}
                    <Text style={styles.tagText}>{type}</Text>
                  </Text>
                </View>
              );
            })}
        </View>
      )}
    </FormControl>
  );
};

const styles = StyleSheet.create({
  searchResults: {
    width: "100%",

    flexDirection: "column",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    zIndex: 50,
    paddingTop: 10,
    paddingBottom: 50,
  },
  searchResult: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    // borderBottomWidth: 1,
  },
  tagText: {
    color: "grey",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Search;

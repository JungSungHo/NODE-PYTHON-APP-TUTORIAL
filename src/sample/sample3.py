import json

with open('./src/sample/json/countries.json', 'r', encoding="utf-8") as fileData:
  for entry in fileData:
    encodeValue = entry.encode('cp932', "ignore")
    decodeValue = encodeValue.decode('cp932')
    print(decodeValue)
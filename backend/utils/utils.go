package utils

import "encoding/json"

func EncodeObject(obj interface{}) (string, error) {
	data, err := json.Marshal(obj)
	if err != nil {
		return "", err
	}
	return string(data), nil
}

func DecodeObject(data string, obj interface{}) error {
	return json.Unmarshal([]byte(data), obj)
}

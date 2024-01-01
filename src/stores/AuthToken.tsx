import { atom } from "recoil";

export const AuthToken = atom({
	key: "token",
	default: "",
});

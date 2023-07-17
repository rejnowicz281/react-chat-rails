import { create } from "zustand";
import { checkLoginStatus, createRoom, getRooms, signIn, signOut, signUp } from "./helpers/API";

export const useUserStore = create((set, get) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: async () => {
        const data = await signOut();
        if (data) {
            console.log(data);
            set({ user: null });
            useRoomsStore.setState({ rooms: [], roomsLoaded: false });
        }
    },
    signIn: async (email, password) => {
        const data = await signIn(email, password);
        if (data.status == "created") {
            console.log(data);
            set({ user: data.user });
            await useRoomsStore.getState().loadRooms();
        }
        return data;
    },
    signUp: async (name, email, password) => {
        const data = await signUp(name, email, password);
        if (data && data.status == "created") {
            console.log(data);
            set({ user: data.user });
            await useRoomsStore.getState().loadRooms();
        }
        return data;
    },
    checkingLoginStatus: true,
    handleLoginStatus: async () => {
        const loginStatus = await checkLoginStatus();
        if (loginStatus.logged_in && !get().user) {
            await useRoomsStore.getState().loadRooms();
            set({ user: loginStatus.user });
        } else if (!loginStatus.logged_in && get().user) {
            set({ user: null });
        }
        set({ checkingLoginStatus: false });
    },
}));

export const useRoomsStore = create((set, get) => ({
    rooms: [],
    setRooms: (rooms) => set({ rooms }),
    roomsLoaded: false,
    setRoomsLoaded: (roomsLoaded) => set({ roomsLoaded }),
    createRoom: async (name) => {
        const roomData = await createRoom(name);
        if (roomData) {
            set({ rooms: [...get().rooms, roomData] });
        }
    },
    loadRooms: async () => {
        const roomsData = await getRooms();
        set({ rooms: roomsData });
        set({ roomsLoaded: true });
        console.log("rooms loaded!");
    },
}));

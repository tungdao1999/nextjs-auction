import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useRef,
} from "react";

interface WebSocketContextType {
    ws: WebSocket | null;
    messages: any[];
    sendMessage: (msg: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
    children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const socket = new WebSocket(`ws://localhost:8080?token=${token}`);

        wsRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            setMessages((prev) => [...prev, data]);
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
            // Optional: implement reconnect logic
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = (msg: string) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(msg);
        }
    };

    return (
        <WebSocketContext.Provider value={{ ws, messages, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};

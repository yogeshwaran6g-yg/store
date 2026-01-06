
import React from "react";
import {createContext, useContext} from "react";

export const DataContext = createContext();

function DataContextProvider ({children}){
    let [user, setUser]= useState(false);
    let [loading, setLoading] = useState(false);
    
    useEffect(() => {
    
    },[]);
   const value = useMemo(() => ({
     user,
     setUser,
     isAuthenticated: !!user,
     loading,
    
   }), [user, loading,]);
 
   return (
     <DataContext.Provider value={value}>
       {children}
     </DataContext.Provider>
   );

}

export function useAuthContext(){
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useAuthContext must be used within a DataContextProvider");
    }
  return context;

}

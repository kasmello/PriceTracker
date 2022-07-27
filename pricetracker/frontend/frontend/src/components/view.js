//this file is here to maintain state of pages when rendering/derendering components

import React, { useState, createContext, useContext, useEffect } from 'react';

const DataView = createContext()
const EditDataView = createContext()

function useDataView() {
    return useContext(DataView)
}
function editDataView() {
    return useContext(EditDataView)
}

function ViewProvider({ children }) {
    const [dataview, setDataView] = useState('table')


    const updateDataView = () => {
        setDataView(dataview=='table' ? 'graph' : 'table')
    }



    return (
        <DataView.Provider value={dataview}>
        <EditDataView.Provider value={updateDataView}>
            { children }
        </EditDataView.Provider>
        </DataView.Provider>
    );
}

export { ViewProvider, useDataView, editDataView }
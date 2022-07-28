//this file is here to maintain state of pages when rendering/derendering components

import React, { useState, createContext, useContext } from 'react';

const DataView = createContext()
const EditDataView = createContext()
const EnableSelect = createContext()
const SelectContext = createContext()

function useEnableSelect() {
  return useContext(EnableSelect)
}

function useSelect() {
  return useContext(SelectContext)
}

function useDataView() {
    return useContext(DataView)
}
function editDataView() {
    return useContext(EditDataView)
}

function ViewProvider({ children }) {
    const [dataview, setDataView] = useState('table')
    const [selected, selectedEnable] = useState('none')
    const changeSelected = () => {
        selectedEnable(selected == 'none' ? 'multiple' : 'none')
    }

    const updateDataView = () => {
        setDataView(dataview=='table' ? 'graph' : 'table')
    }



    return (
        <EnableSelect.Provider value = { changeSelected }>
        <SelectContext.Provider value = { selected }>
        <DataView.Provider value={dataview}>
        <EditDataView.Provider value={updateDataView}>
            { children }
        </EditDataView.Provider>
        </DataView.Provider>
        </SelectContext.Provider>
        </EnableSelect.Provider>
    );
}

export { ViewProvider, useDataView, editDataView, useEnableSelect, useSelect }
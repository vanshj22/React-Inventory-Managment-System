import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";
import UpdateStore from "../components/UpdateStore";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateStore, setUpdateStore] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [updatePage]);

  // Fetching all stores data
  const fetchData = () => {
    fetch(`https://node-inventory-management-07460c9da453.herokuapp.com/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  // Modal for Store UPDATE
  const updateStoreModalSetting = (selectedStoreData) => {
    console.log("Clicked: edit");
    setUpdateStore(selectedStoreData);
    setShowUpdateModal(!showUpdateModal);
  };

  // Delete item
  const deleteItem = (id) => {
    console.log("Store ID: ", id);
    console.log(`https://node-inventory-management-07460c9da453.herokuapp.com/api/store/delete/${id}`);
    fetch(`https://node-inventory-management-07460c9da453.herokuapp.com/api/store/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      });
  };

  const modalSetting = () => {
    setShowModal(!showModal);
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center ">
      <div className=" flex flex-col gap-5 w-11/12 border-2">
        <div className="flex justify-between p-2">
          <span className="font-bold">Manage Catalog</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
            onClick={modalSetting}
          >
            Add Catalog
          </button>
        </div>
        {showModal && <AddStore />}
        {showUpdateModal && (
          <UpdateStore
            updateStoreData={updateStore}
            updateModalSetting={updateStoreModalSetting}
          />
        )}
        {stores.map((element, index) => {
          return (
            <div
              className="bg-white w-50 h-fit flex flex-col gap-4 p-4 "
              key={element._id}
            >
              <div>
                <img
                  alt="store"
                  className="h-60 w-full object-cover"
                  src={require("../assets/store.png")}
                />
              </div>
              <div className="flex flex-col gap-3 justify-between items-start">
                <span className="font-bold">{element.name}</span>
                <div className="flex">
                  <img
                    alt="location-icon"
                    className="h-6 w-6"
                    src={require("../assets/location-icon.png")}
                  />
                  <span>{element.address + ", " + element.city}</span>
                </div>
                <div className="flex">
                <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => updateStoreModalSetting(element)}
                      >
                        Edit{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => deleteItem(element._id)}
                      >
                        Delete
                      </span>
                      </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Store;

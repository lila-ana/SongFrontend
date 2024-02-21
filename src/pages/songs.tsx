import React, { useCallback, useEffect, useState } from "react";
import { logout } from "../Store/Login/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal, Upload } from "antd";
import { RootState } from "../Store/rootReducer";
import {
  createSongRequest,
  createSongSuccess,
  deleteSongRequest,
  fetchSongsRequest,
  updateSongRequest,
} from "../Store/Songs/songSlice";
import { GiMusicalNotes } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiSolidShow } from "react-icons/bi";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload";
import { createSelector } from "@reduxjs/toolkit";
import { debounce } from "lodash";
import { v4 as uuidv4 } from "uuid";
interface SongDetails {
  title: string;
  artist: string;
  album: string;
  genre: string;
  path: string;
}

const Songs: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectToken = createSelector(
    (state: RootState) => state.loginReducer.token,
    (token) => token
  );
  const token = useSelector(selectToken);

  const songs = useSelector((state: any) => state.songReducer.songs);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [createSongModalVisible, setCreateSongModalVisible] = useState(false);
  const [newSongDetails, setNewSongDetails] = useState<SongDetails>({
    title: "",
    artist: "",
    album: "",
    genre: "",
    path: "",
  });
  const [editSongDetails, setEditSongDetails] = useState<SongDetails>({
    title: "",
    artist: "",
    album: "",
    genre: "",
    path: "",
  });
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  //============> GET SECTION <===============

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  //============> CREATE SECTION <===============
  const handleCreateSongButton = () => {
    setCreateSongModalVisible(true);
    setIsEditMode(false);
  };

  // const handleUpdateSong = useCallback(
  //   (songId: string | undefined, updatedSongDetails: SongDetails) => {
  //     // Implement your update logic here
  //   },
  //   []
  // );

  // const handleAddSong = useCallback(() => {
  //   if (isEditMode) {
  //     handleUpdateSong(selectedSong?.id, editSongDetails);
  //   } else {
  //     dispatch(createSongRequest(newSongDetails: SongDetails));
  //     setOpenModal(false);
  //   }
  // }, [dispatch, isEditMode, selectedSong, editSongDetails, newSongDetails]);
  // Import uuid library for generating unique ids

  const handleAddSong = useCallback(() => {
    if (isEditMode) {
      handleUpdateSong(selectedSong?.id, editSongDetails);
    } else {
      const newSongWithId = { ...newSongDetails, id: uuidv4() }; // Generate id for the new song
      dispatch(createSongRequest());
      dispatch(createSongSuccess(newSongWithId)); // Dispatch createSongSuccess with the new song including id
      setOpenModal(false);
    }
  }, [dispatch, isEditMode, selectedSong, editSongDetails, newSongDetails]);

  //============> INPUT CHANGE SECTION <===============

  const debouncedHandleInputChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>, field: string) => {
      const { value } = e.target;
      if (isEditMode) {
        setEditSongDetails((prevDetails) => ({
          ...prevDetails,
          [field]: value,
        }));
      } else {
        setNewSongDetails((prevDetails) => ({
          ...prevDetails,
          [field]: value,
        }));
      }
    }, 300),
    [isEditMode]
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    debouncedHandleInputChange(e, field);
  };

  //============> UPDATE SECTION <===============

  const handleUpdateSong = (id: string, updatedSong: SongDetails) => {
    dispatch(updateSongRequest({ id, updatedSong }));
    setOpenModal(false);
    id;
  };
  const handleEditClick = (song: any) => {
    setEditSongDetails(song);
    setSelectedSong(song);
    setOpenModal(true);
    setIsEditMode(true);
  };

  //============> DELETE SECTION <===============

  const handleDeleteConfirm = () => {
    if (selectedSong && selectedSong.id) {
      dispatch(deleteSongRequest(selectedSong?.id));
      setOpenDeleteModal(false);
    }
  };
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };
  const handleDeleteClick = (song: any) => {
    setSelectedSong(song);
    setOpenDeleteModal(true);
  };

  const handleNavigate = () => {
    navigate("/statistics");
  };

  const normFile = (e: UploadChangeParam) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      {!token ? (
        <div></div>
      ) : (
        <Button
          className="flex items-center justify-end bg-green-500 m-5 text-white"
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Melodio
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Access your favorite tunes, create personalized playlists, and
              discover new artists.
            </p>
          </div>
          <div className="my-3 flex items-center justify-start gap-2">
            <Button
              onClick={handleCreateSongButton}
              className="flex gap-2 items-center justify-center hover:border-green-500 bg-green-500 mb-4 text-white"
            >
              <IoIosAddCircleOutline />
              Add Song
            </Button>
            <Button
              onClick={handleNavigate}
              className="flex gap-2 items-center justify-center hover:border-green-500 bg-green-500 mb-4 text-white"
            >
              <BiSolidShow />
              Show Statistics
            </Button>
          </div>
          <div className="flex flex-wrap -m-4">
            {songs?.map((items: any) => (
              <div className="xl:w-1/3 md:w-1/2 p-4" key={items.id}>
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                    <GiMusicalNotes />
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    {items.title}
                  </h2>
                  <p className="leading-relaxed text-base">
                    Fingerstache flexitarian street art 8-bit waist co, subway
                    tile poke farm.
                  </p>
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => handleEditClick(items)}>
                      <CiEdit className="fill-green-500" />
                    </button>
                    <button onClick={() => handleDeleteClick(items)}>
                      <MdDeleteForever className="fill-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Modal
        title={isEditMode ? "Edit Song" : "Create Song"}
        open={createSongModalVisible || openModal}
        onOk={
          isEditMode
            ? () => handleUpdateSong(selectedSong?.id, editSongDetails)
            : handleAddSong
        }
        onCancel={() => {
          setCreateSongModalVisible(false);
          setOpenModal(false);
        }}
      >
        <Form onFinish={handleAddSong}>
          <div className="m-[5px]">
            <label>Title:</label>
            <Input
              value={isEditMode ? editSongDetails.title : newSongDetails.title}
              onChange={(e) => handleInputChange(e, "title")}
            />
          </div>
          <div className="m-[5px]">
            <label>Artist:</label>
            <Input
              value={
                isEditMode ? editSongDetails.artist : newSongDetails.artist
              }
              onChange={(e) => handleInputChange(e, "artist")}
            />
          </div>
          <div className="m-[5px]">
            <label>Album:</label>
            <Input
              value={isEditMode ? editSongDetails.album : newSongDetails.album}
              onChange={(e) => handleInputChange(e, "album")}
            />
          </div>
          <div className="m-[5px]">
            <label>Genre:</label>
            <Input
              value={isEditMode ? editSongDetails.genre : newSongDetails.genre}
              onChange={(e) => handleInputChange(e, "genre")}
            />
          </div>

          <div className="m-[5px]">
            <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Confirm Delete"
        open={openDeleteModal}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this song?</p>
      </Modal>
    </div>
  );
};
export default Songs;

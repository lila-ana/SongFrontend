import React, { useEffect, useState } from "react";
import { logout } from "../Store/Login/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Modal } from "antd";
import { RootState } from "../Store/rootReducer";
import {
  createSongRequest,
  deleteSongRequest,
  fetchSongsRequest,
  updateSongRequest,
} from "../Store/Songs/songSlice";
import { GiMusicalNotes } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiSolidShow } from "react-icons/bi";

interface SongDetails {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const Songs: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.loginReducer.token);
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
  });
  const [editSongDetails, setEditSongDetails] = useState<SongDetails>({
    title: "",
    artist: "",
    album: "",
    genre: "",
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
  const handleAddSong = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isEditMode) {
      handleUpdateSong(selectedSong?.id, editSongDetails);
    } else {
      dispatch(createSongRequest(newSongDetails));
      setCreateSongModalVisible(false);
    }
  };
  //============> INPUT CHANGE SECTION <===============

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
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
            {songs?.map((items: any, index: number) => (
              <div className="xl:w-1/3 md:w-1/2 p-4">
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
        <form onSubmit={handleAddSong}>
          <div>
            <label>Title:</label>
            <Input
              value={isEditMode ? editSongDetails.title : newSongDetails.title}
              onChange={(e) => handleInputChange(e, "title")}
            />
          </div>
          <div>
            <label>Artist:</label>
            <Input
              value={
                isEditMode ? editSongDetails.artist : newSongDetails.artist
              }
              onChange={(e) => handleInputChange(e, "artist")}
            />
          </div>
          <div>
            <label>Album:</label>
            <Input
              value={isEditMode ? editSongDetails.album : newSongDetails.album}
              onChange={(e) => handleInputChange(e, "album")}
            />
          </div>
          <div>
            <label>Genre:</label>
            <Input
              value={isEditMode ? editSongDetails.genre : newSongDetails.genre}
              onChange={(e) => handleInputChange(e, "genre")}
            />
          </div>
        </form>
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

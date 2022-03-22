import React, { useEffect, useState } from "react";
import {
  ImageList,
  ImageListItem,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IAlbum } from "types";
import NewAlbumModal from "./AddNewAlbum";
import { useNavigate } from "react-router-dom";
import { useCoverpages, useDeleteAlbum } from "services/album";

type FormVale = Omit<IAlbum, "photos">;

const CoverPage = () => {
  // const [path, setPath] = useState<FormVale[]>([]);
  const navigate = useNavigate();
  const { data: coverPages = [] } = useCoverpages();
  const { mutateAsync: deleteAlbum } = useDeleteAlbum();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedID, setSelectedID] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedID(null);
  };

  return (
    <>
      <NewAlbumModal />

      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {/* @ts-ignore */}
        {coverPages.map((item, index) => (
          <ImageListItem
            key={item.name}
            sx={{
              position: "relative",
              ":hover": {
                backgroundColor: "primary.dark",
                opacity: [0.9, 0.8, 0.7],
                cursor: "pointer",
              },
              ":hover .more__icon": {
                display: "block",
              },
            }}
          >
            <IconButton
              aria-label="delete"
              onClick={(event) => {
                handleClick(event);

                setSelectedID(item._id);
              }}

              // aria-controls={open ? "basic-menu" : undefined}
              // aria-haspopup="true"
              // aria-expanded={open ? "true" : undefined}
            >
              <MoreVertIcon
                className="more__icon"
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 0,
                  display: "none",
                }}
              />
            </IconButton>
            <Menu
              // id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              // MenuListProps={{
              //   "aria-labelledby": "basic-button",
              // }}
            >
              <MenuItem
                onClick={() => {
                  if (selectedID) {
                    deleteAlbum({ id: selectedID });
                  }
                }}
              >
                Delete
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>Rename</MenuItem> */}
            </Menu>
            <img
              src={`${process.env.REACT_APP_DEV_URL}/images/${item.coverPage}`}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
              onClick={() => navigate(`/album/${item._id}`)}
            />
            <p>{item.name}</p>
            <p>{item._id}</p>
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default CoverPage;

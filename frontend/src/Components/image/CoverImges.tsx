import { useEffect, useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IAlbum } from "../../Types";
import ImageModal from "./New-Album-Modal";
import { useNavigate } from "react-router-dom";

type FormVale = Omit<IAlbum, "photos">;

const CoverPage = () => {
  const [path, setPath] = useState<FormVale[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DEV_URL}/albums/coverpages`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Fail to get data");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setPath(res.data);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  return (
    <>
      <ImageModal />

      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {path.map((item) => (
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
            onClick={() => navigate(`/album/${item._id}`)}
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
            <img
              src={`${process.env.REACT_APP_DEV_URL}/images/${item.coverPage}`}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default CoverPage;

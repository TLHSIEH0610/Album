import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAlbum } from "../../Types";
import { ImageList, ImageListItem, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NewPhotoModal from "./New-Photos-Modal";

const Photos = () => {
  let { id } = useParams();
  const [data, setData] = useState<string[]>([]);
  const [restoreData, setRestoreData] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DEV_URL}/albums/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Fail to get data");
        }
        return res.json();
      })
      .then((res) => {
        setData(res.data.photos);
        setRestoreData(res.data.photos);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  const updaePhotos = () => {
    fetch(`${process.env.REACT_APP_DEV_URL}/albums/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ photos: data }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      setIsEditing(false);
    });
  };

  const removeImageFromData = (image: string) => {
    const newData = [...data].filter((item) => item !== image);

    setData(newData);
  };

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          marginTop: "1rem ",
        }}
      >
        <Button variant="contained" onClick={() => navigate("/")}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (isEditing) {
              updaePhotos();
            }
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setIsEditing(false);
            setData(restoreData);
          }}
          sx={{ display: isEditing ? "block" : "none" }}
        >
          Cancel
        </Button>
        {!isEditing && <NewPhotoModal />}
      </Stack>

      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {data.map((item) => (
          <ImageListItem
            key={item}
            sx={{
              position: "relative",
            }}
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                display: isEditing ? "block" : "none",
              }}
              onClick={() => removeImageFromData(item)}
            >
              Delete
            </Button>
            <img
              src={`${process.env.REACT_APP_DEV_URL}/images/${item}`}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={`item.name`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};
export default Photos;

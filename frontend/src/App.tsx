import { useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

interface FormValues {
  name: string;
  coverPage: string[];
  photos: string[];
}

function App() {
  const { handleSubmit, register } = useForm<FormValues>();
  const [path, setPath] = useState<Omit<FormValues, "photos">[]>([]);

  useEffect(() => {
    fetch("/albums/coverages")
      .then((res) => {
        if (!res.ok) {
          throw Error("Fail to get data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPath(data.data);
      });
  }, []);

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("coverPage", values.coverPage[0]);
    Array.from(values.photos).forEach((photo: string) =>
      formData.append("photos", photo)
    );

    fetch("/albums", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        throw Error("add album failed");
      }
      console.log(res.json());
    });
  };

  return (
    <>
      <Button variant="contained">Create Album</Button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label>Album Name</label>
          <Input {...register("name")} type="text" />
        </section>

        <section>
          <label>Coverpage</label>
          <Input {...register("coverPage")} type="file" />
        </section>

        <section>
          <label>Photos</label>
          <Input
            {...register("photos")}
            type="file"
            inputProps={{
              accept: "image/png, image/jpeg",
              multiple: true,
            }}
          />
        </section>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </form>

      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {path.map((item) => (
          <ImageListItem key={item.name}>
            <img
              src={`http://localhost:3000/images/${item.coverPage}`}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

export default App;

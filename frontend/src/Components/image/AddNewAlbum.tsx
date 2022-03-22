import { useState } from "react";

import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useForm } from "react-hook-form";
import { useNewAlbum } from "services/album";
import { Modal, Box } from "@mui/material";

interface FormValues {
  name: string;
  coverPage: string;
  photos: string[];
}

const NewAlbumModal = () => {
  const { handleSubmit, register } = useForm<FormValues>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutateAsync: NewAlbumMutation } = useNewAlbum();

  const onSubmit = (values: FormValues) => {
    NewAlbumMutation(values);
  };

  return (
    <>
      <Button
        sx={{
          marginTop: "1rem ",
        }}
        onClick={handleOpen}
        variant="contained"
      >
        Create Album
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
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
        </Box>
      </Modal>
    </>
  );
};

export default NewAlbumModal;

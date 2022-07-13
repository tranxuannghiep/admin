import { IconButton, Stack } from "@mui/material";
import { ErrorMessage, FastField, FieldProps, FormikProps } from "formik";
import { CreateProduct, Images } from "models/products";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdPhotoCamera } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

export interface ImageFormProps {
  form: FormikProps<CreateProduct>;
}

export default function ImageForm({ form: formik }: ImageFormProps) {
  const [imgList, setImgList] = useState<string[]>(
    formik.values.imagesUpload.map((val) => {
      if (Object.keys(val).length === 2) return (val as Images).file;
      else return URL.createObjectURL(val as File);
    })
  );
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = [...formik.values.imagesUpload];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    formik.setFieldValue("imagesUpload", items);
    const imgOrder = items.filter(
      (val) => Object.keys(val).length === 2
    ) as Images[];
    formik.setFieldValue(
      "imagesOrder",
      imgOrder.map((val) => val.file)
    );
    const [reorderedImg] = imgList.splice(result.source.index, 1);
    imgList.splice(result.destination.index, 0, reorderedImg);
    setImgList(imgList);
  };
  return (
    <div className="row mb-4">
      <label className="col-sm-2">Images *</label>
      <FastField name="imagesUpload">
        {({ field }: FieldProps) => (
          <div
            {...field}
            className="col-sm-8 d-flex align-items-start flex-wrap"
          >
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    {formik.values.imagesUpload &&
                      formik.values.imagesUpload.map((file, index) => {
                        return (
                          <Draggable
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="img-select"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <span
                                  className="deleteImg"
                                  onClick={() => {
                                    formik.setFieldValue("imagesUpload", [
                                      ...formik.values.imagesUpload.slice(
                                        0,
                                        index
                                      ),
                                      ...formik.values.imagesUpload.slice(
                                        index + 1
                                      ),
                                    ]);
                                    setImgList([
                                      ...imgList.slice(0, index),
                                      ...imgList.slice(index + 1),
                                    ]);
                                    if (Object.keys(file).length === 2) {
                                      formik.setFieldValue("deleted_images", [
                                        ...formik.values.deleted_images,
                                        (file as Images).id,
                                      ]);
                                    }
                                  }}
                                >
                                  <TiDelete />
                                </span>

                                <img src={imgList[index]} alt="" />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="icon-button-file" className="bd-dashed p-4">
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const selectedFiles = e.target.files;
                    if (selectedFiles && selectedFiles?.length > 0) {
                      formik.setFieldValue("imagesUpload", [
                        ...formik.values.imagesUpload,
                        ...Array.from(selectedFiles),
                      ]);
                      setImgList([
                        ...imgList,
                        ...Array.from(selectedFiles).map((file) =>
                          URL.createObjectURL(file)
                        ),
                      ]);
                    }
                  }}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <MdPhotoCamera fontSize="60px" color="white" />
                </IconButton>
              </label>
            </Stack>
          </div>
        )}
      </FastField>
      <div className="row mt-1">
        <div className="col-sm-2"></div>
        <div className="col-sm-4">
          <small>
            <ErrorMessage name="imagesUpload" />
          </small>
        </div>
      </div>
    </div>
  );
}

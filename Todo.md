# TODO

## Clean up project repository

- [ ] move old files to `archive` folder
- [ ] improve documentation
- [ ] make existing code simpler to follow and more descriptive

---

## Setup simple Redis database

- [ ] Setup to run in a docker container with a data folder outside the container, mapped using volumes
- [ ] To save captured images
- [ ] To add metadata for processed images
- [ ] To remove images that have been processed with no birds in them
- [ ] To add label classifications

## Labeler

- [X] create HTML with placeholders for:
  - [X] image
  - [X] image details (date, time, state)
  - [X] list of labels
  - [X] buttons to add / remove labels
  - [ ] save button
  - [ ] discard and delete button
  - [ ] list of defined areas
  - [ ] buttons to add / remove defined areas
- [X] create flask backend to get list of labels from mongodb
- [ ] create flask backend to set / update list of labels to mongodb
- [ ] create backend to get image & image details from mongodb
- [ ] finesse with CSS and transition animations
- [X] create python script to seed database with some labels
- [ ] add some test data from real camera captures
- [ ] Update UI to make it simpler and responsive

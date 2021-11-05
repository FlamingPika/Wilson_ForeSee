export const EyecheckData = {
  sph: {
    os: 1.75,
    od: 1.75,
  },
  cyl: {
    os: -0.25,
    od: -0.25,
  },
  axis: {
    os: 10,
    od: 170,
  },
  vau: {
    os: 20,
  },
  vaa: {
    os: 30,
    od: 10,
  },
  pd: 60,
};

export const Appointments = [
  { id: 1, memberId: 1, date: "12/12/2021" },
  { id: 2, memberId: 2, date: "01/10/2030" },
  { id: 3, memberId: 3, date: "11/04/2020" },
  { id: 4, memberId: 4, date: "24/11/2010" },
];

export const Members = [
  {
    id: 1,
    name: "Luke Skywalker",
    profile_pic: "https://starwars-visualguide.com/assets/img/characters/1.jpg",
    contact_number: "7249120",
    eyecheckData: EyecheckData,
  },
  {
    id: 2,
    name: "C-3PO",
    profile_pic: "https://starwars-visualguide.com/assets/img/characters/2.jpg",
    contact_number: "18933156",
    eyecheckData: EyecheckData,
  },
  {
    id: 3,
    name: "R2-D2",
    profile_pic: "https://starwars-visualguide.com/assets/img/characters/3.jpg",
    contact_number: "189156",
  },
  {
    id: 4,
    name: "Darth Vader",
    profile_pic: null,
    contact_number: "4891613",
  },
];

export const Profiles = [
  {
    id: 1,
    name: "Family 1",
    members: [1, 2, 3, 4],
  },
];

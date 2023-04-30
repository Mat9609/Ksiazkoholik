var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ],
    datasets: [
      {
        data: [6, 8, 4, 5, 9, 2, 7, 8, 3, 1, 9, 7],
        label: "Przeczytane",
        borderColor: "#3e95cd",
        backgroundColor: "rgb(62,149,205,0.5)",
        borderWidth: 2,
      },
      {
        data: [9, 10, 2, 6, 4, 3, 9, 2, 1, 4, 3, 3],
        label: "Dodane na półkę",
        borderColor: "#3cba9f",
        backgroundColor: "rgb(60,186,159,0.5)",
        borderWidth: 2,
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Miesiąc",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Liczba książek",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    title: {
      display: true,
      text: "Liczba książek przeczytanych i dodanych na półkę",
    },
  },
});

var ctx2 = document.getElementById("myChart2").getContext("2d");
var myChart2 = new Chart(ctx2, {
  type: "doughnut",
  data: {
    labels: [
      "Powieść historyczna",
      "Fantastyka",
      "Popularnonaukowe",
      "Kryminał",
      "Inne",
    ],
    datasets: [
      {
        data: [45, 20, 15, 12, 8],
        borderColor: ["#4E5BB1", "#B14E8C", "#B1A44E", "#4EB173", "#8A52AD"],
        backgroundColor: [
          "#4E5BB1",
          "#B14E8C",
          "#B1A44E",
          "#4EB173",
          "#8A52AD",
        ],
        borderWidth: 2,
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
  },
});

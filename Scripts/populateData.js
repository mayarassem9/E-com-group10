function populateUser() {
  localStorage.setItem(
    "currentUser",
    JSON.stringify([
      {
        id: 4,
        username: "mohamed_The_Customer",
        email: "mohamedmm555@gmail.com",
        password: "123456789",
        role: "customer",
      },
    ])
  );
}
function populateAllUsers() {
  localStorage.setItem(
    "users",
    JSON.stringify([
      {
        id: 1,
        username: "AhmedAli",
        email: "admin@gmail.com",
        password: "123456789",
        role: "admin",
      },
      {
        id: 2,
        username: "Hamada_The_Seller",
        email: "seller166@gmail.com",
        password: "sellerpass",
        role: "seller",
      },
      {
        id: 3,
        username: "ALITheCustomer",
        email: "ALITheCustomer@gmail.com",
        password: "1234567899",
        role: "customer",
      },
      {
        id: 4,
        username: "mohamed_The_Customer",
        email: "mohamedmm555@gmail.com",
        password: "123456789",
        role: "customer",
      },
      {
        id: 5,
        username: "mayar",
        email: "mayar@gmail.com",
        password: "12345678910",
        role: "customer",
      },
      {
        id: 6,
        username: "mohamed",
        email: "mohamed@yahoo.com",
        password: "123456789",
        role: "seller",
      },
      {
        id: 7,
        username: "hamdy",
        email: "hamdy@yahoo.com",
        password: "hamdy123456",
        role: "seller",
      },
    ])
  );
}
function populateAllBooks() {
  localStorage.setItem(
    "books",
    JSON.stringify([
      {
        ID: 1,
        title: "Abu Alhoul",
        author: "Ahmed Mourad",
        description:
          "Mourads novel details the life of photographer and crime expert Sulaiman ElSeyofy known for investigating a mysterious century crime during the Egyptian plague",
        price: 115,
        category: "Fiction",
        salerID: 6,
        imgLink: "Resources/Images/books/abuAlhoulBook.jpg",
        stockNum: 15,
      },
      {
        ID: 2,
        title: "The final Gambit",
        author: "Jennifer Lynn Barnes",
        description:
          "Avery Kylie Grambs the teenage girl who is unexpectedly left a billion dollar fortune by mysterious philanthropist Tobias Tattersall Hawthorne",
        price: 125,
        category: "Fiction",
        salerID: 6,
        imgLink: "Resources/Images/books/TheFinalGambit.jpg",
        stockNum: 18,
      },
      {
        ID: 3,
        title: "Fire And Blood",
        author: "George R R Martin",
        description:
          "Avery Kylie Grambs the teenage girl who is unexpectedly left a billiondollar fortune by mysterious philanthropist Tobias Tattersall Hawthorne",
        price: 158,
        category: "Fiction",
        salerID: 6,
        imgLink: "Resources/Images/books/FireAndBlood.jpg",
        stockNum: 22,
      },
      {
        ID: 4,
        title: "Tale of Two Cities",
        author: "Charles Dickens",
        description:
          "Dickens novel weaves love and sacrifice into the turbulent backdrop of the French Revolution",
        price: 135,
        category: "Fiction",
        salerID: 6,
        imgLink: "Resources/Images/books/TaleofTwoCities.jpg",
        stockNum: 23,
      },
      {
        ID: 5,
        title: "Murder On The Orient Express",
        author: "Agatha Christies",
        description:
          "Detective Poirot untangles a murder mystery on a luxurious train with intricate passenger secrets",
        price: 340,
        category: "Fiction",
        salerID: 2,
        imgLink: "Resources/Images/books/MurderOnTheOrientExpress.jpeg",
        stockNum: 16,
      },
      {
        ID: 6,
        title: "We Free The Stars",
        author: "Hafsah Faizal",
        description:
          "continues the thrilling fantasy saga of We Hunt the Flame by Hafsah following Zafira and Nasir on a quest filled with magic and intrigue",
        price: 150,
        category: "Fiction",
        salerID: 2,
        imgLink: "Resources/Images/books/WeFreeTheStars.jpg",
        stockNum: 19,
      },

      {
        ID: 8,
        title: "Rich Dad And Poor Dad",
        author: "Robert T Kiyosaki",
        description:
          "contrasts financial philosophies providing insights into wealth building strategies and the mindset for financial success",
        price: 110,
        category: "Motivational",
        salerID: 2,
        imgLink: "Resources/Images/books/RichDadAndPoorDad.jpg",
        stockNum: 17,
      },
      {
        ID: 9,
        title: "Atomic Habits",
        author: "James Clear",
        description:
          "contrasts financial philosophies providing insights into wealth building strategies and the mindset for financial success",
        price: 80,
        category: "Motivational",
        salerID: 6,
        imgLink: "Resources/Images/books/AtomicHabits.jpg",
        stockNum: 21,
      },
      {
        ID: 10,
        title: "Good to Great",
        author: "James C Collins",
        description:
          " reveals how exceptional companies achieve sustained greatness through visionary leadership and disciplined processes",
        price: 186,
        category: "Motivational",
        salerID: 6,
        imgLink: "Resources/Images/books/GoodToGreat.jpg",
        stockNum: 19,
      },
      {
        ID: 11,
        title: "The Body Keeps The Score",
        author: "Bessel Van Der Kolk",
        description:
          "delves into the impact of trauma on the body and mind, providing insights and therapeutic approaches for healing",
        price: 99,
        category: "Motivational",
        salerID: 6,
        imgLink: "Resources/Images/books/TheBodyKeepsTheScore.jpg",
        stockNum: 26,
      },
      {
        ID: 12,
        title: "Never Split The Difference",
        author: "Chris Voss",
        description:
          "is a practical guide to negotiation drawing from FBI experiences with tips for success in various negotiations",
        price: 210,
        category: "Motivational",
        salerID: 6,
        imgLink: "Resources/Images/books/NeverSplitTheDifference.jpg",
        stockNum: 29,
      },
      {
        ID: 13,
        title: "Men From Mars And Women From Venus",
        author: "John Gray",
        description:
          "delves into the differences in communication and emotional needs between genders providing insights for better relationships",
        price: 222,
        category: "Motivational",
        salerID: 6,
        imgLink: "Resources/Images/books/MenFromMarsAndWomenFromVenus.jpg",
        stockNum: 13,
      },
      {
        ID: 14,
        title: "Great by Choice",
        author: "Jim Collins",
        description:
          "explores how successful companies thrive in uncertainty through disciplined decision-making and consistent innovation",
        price: 550,
        category: "Motivational",
        salerID: 6,
        imgLink: "Resources/Images/books/GreatByChoice.jpg",
        stockNum: 23,
      },
      {
        ID: 15,
        title: "Charlie and the Chocolate Factory",
        author: "Jim Collins",
        description:
          "explores how successful companies thrive in uncertainty through disciplined decision making and consistent innovation",
        price: 550,
        category: "Children",
        salerID: 6,
        imgLink: "Resources/Images/books/CharlieAndTheChocolateFactory.jpg",
        stockNum: 25,
      },
      {
        ID: 16,
        title: "The Chalice Of TheGods",
        author: "Rick Riordan",
        description:
          "explores how successful companies thrive in uncertainty through disciplined decision making and consistent innovation",
        price: 320,
        category: "Children",
        salerID: 6,
        imgLink: "Resources/Images/books/TheChaliceOfTheGods.jpg",
        stockNum: 12,
      },
      {
        ID: 17,
        title: "The Sea of Monsters",
        author: "Rick Riordan",
        description:
          "Percy Jackson undertakes a perilous quest to the Sea of Monsters to retrieve the Golden Fleece encountering mythical challenges to save his camp and the world",
        price: 350,
        category: "Children",
        salerID: 6,
        imgLink: "Resources/Images/books/TheSeaOfMonsters.jpg",
        stockNum: 9,
      },
      {
        ID: 18,
        title: "The Christmas Owl",
        author: "Ellen Kalish",
        description:
          "Experience the beautiful story that captivated the country about a little owl found in the worlds most famous Christmas tree",
        price: 450,
        category: "Children",
        salerID: 6,
        imgLink: "Resources/Images/books/TheChristmasOwl.jpg",
        stockNum: 16,
      },
      {
        ID: 19,
        title: "Song for a Whale",
        author: "Lynne Kelly",
        description:
          "A stirring and heart warming tale of a young deaf girl who is determined to make a difference the perfect read for fans of Wonder",
        price: 110,
        category: "Children",
        salerID: 2,
        imgLink: "Resources/Images/books/SongForWhale.jpg",
        stockNum: 17,
      },
      {
        ID: 20,
        title: "Winter Turning",
        author: "Tui T Sutherland",
        description:
          "dragons navigate political intrigue and personal challenges during an IceWing succession war in the Wings of Fire series",
        price: 330,
        category: "Children",
        salerID: 2,
        imgLink: "Resources/Images/books/WinterTurning.jpg",
        stockNum: 23,
      },
      {
        ID: 21,

        title: "Harry Potter and the Philosophers Stone",
        author: "J. K. Rowling",
        description:
          "follows young wizard Harry Potter at Hogwarts as he unravels the mystery of the Philosophers Stone and confronts the dark wizard Lord Voldemort",
        price: 410,
        category: "Children",
        salerID: 2,
        imgLink:
          "Resources/Images/books/HarryPotterandthePhilosophersStone.jpg",
        stockNum: 25,
      },
      {
        ID: 22,
        title: "Guns Germs and Steel",
        author: "Jared Diamond",
        description:
          "analyzes how geography and agriculture have shaped human history and global inequalities",
        price: 210,
        category: "History",
        salerID: 2,
        imgLink: "Resources/Images/books/GunsGermsAndSteel.jpg",
        stockNum: 15,
      },
      {
        ID: 23,
        title: "The Warmth of Other Suns",
        author: "Isabel Wilkerson ",
        description:
          "explores the Great Migration detailing the significant journeys of African Americans from the Southern US to the North and West ",
        price: 610,
        category: "History",
        salerID: 2,
        imgLink: "Resources/Images/books/TheWarmthOfOtherSuns.jpg",
        stockNum: 19,
      },
      {
        ID: 24,
        title: "Alexander Hamilton",
        author: "Biographer Ron Chernow",
        description:
          "detailed biography chronicling the life and significant contributions of this Founding Father to the shaping of the United States",
        price: 210,
        category: "History",
        salerID: 2,
        imgLink: "Resources/Images/books/AlexanderHamilton.jpeg",
        stockNum: 16,
      },
      {
        ID: 25,
        title: "The Crusades",
        author: "Thomas Asbridge",
        description:
          "The Crusades is an authoritative accessible single volume history of the brutal struggle for the Holy Land in the Middle Ages",
        price: 410,
        category: "History",
        salerID: 2,
        imgLink: "Resources/Images/books/TheCrusades.jpg",
        stockNum: 18,
      },
      {
        ID: 26,
        title: "The Devil in the White City",
        author: "Erik Larson",
        description:
          "Murder Magic and Madness at the Fair That Changed America is a 2003 historical",
        price: 220,
        category: "History",
        salerID: 2,
        imgLink: "Resources/Images/books/TheDevilintheWhiteCity.jpg",
        stockNum: 29,
      },
      {
        ID: 27,
        title: "The Guns of August",
        author: "Barbara W. Tuchman",
        description:
          " It is centered on the first month of World War I After introductory chapters Tuchman describes in great detail the opening events of the conflict",
        price: 310,
        category: "History",
        salerID: 2,
        imgLink: "Resources/Images/books/TheGunsofAugust.jpg",
        stockNum: 17,
      },
    ])
  );
}

function populateMyBooks() {
  localStorage.setItem(
    "mybooks",
    JSON.stringify([
      {
        ID: 1,
        title: "Abu Alhoul",
        author: "Ahmed Mourad",
        description:
          "Mourads novel details the life of photographer and crime expert Sulaiman El Seyofy known for investigating a mysterious century crime during the Egyptian plague",
        price: 115,
        category: "Fiction",
        userID: 1,
        imgLink: "Resources/Images/books/abuAlhoulBook.jpg",
        stockNum: 0,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 2,
        title: "The final Gambit",
        author: "Jennifer Lynn Barnes",
        description:
          "Avery Kylie Grambs the teenage girl who is unexpectedly left a billiondollar fortune by mysterious philanthropist Tobias Tattersall Hawthorne",
        price: 125,
        category: "Fiction",
        userID: 1,
        imgLink: "Resources/Images/books/TheFinalGambit.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 3,
        title: "Fire And Blood",
        author: "George R RMartin",
        description:
          "Avery Kylie Grambs the teenage girl who is unexpectedly left a billion dollar fortune by mysterious philanthropist Tobias Tattersall Hawthorne",
        price: 158,
        category: "Fiction",
        userID: 1,
        imgLink: "Resources/Images/books/FireAndBlood.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 4,
        title: "Tale of Two Cities",
        author: "Charles Dickens",
        description:
          "Dickens novel weaves love and sacrifice into the turbulent backdrop of the French Revolution",
        price: 135,
        category: "Fiction",
        userID: 1,
        imgLink: "Resources/Images/books/TaleofTwoCities.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 5,
        title: "Murder On The Orient Express",
        author: "Agatha Christies",
        description:
          "Detective Poirot untangles a murder mystery on a luxurious train with intricate passenger secrets",
        price: 340,
        category: "Fiction",
        userID: 1,
        imgLink: "Resources/Images/books/MurderOnTheOrientExpress.jpeg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 6,
        title: "We Free The Stars",
        author: "Hafsah Faizal",
        description:
          "continues the thrilling fantasy saga of We Hunt the Flame by Hafsah Faizal following Zafira and Nasir on a quest filled with magic and intrigue",
        price: 150,
        category: "Fiction",
        userID: 1,
        imgLink: "Resources/Images/books/WeFreeTheStars.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },

      {
        ID: 8,
        title: "Rich Dad And Poor Dad",
        author: "Robert T Kiyosaki",
        description:
          "contrasts financial philosophies providing insights into wealth building strategies and the mindset for financial success.",
        price: 110,
        category: "Motivational",
        userID: 1,
        imgLink: "Resources/Images/books/RichDadAndPoorDad.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 9,
        title: "Atomic Habits",
        author: "James Clear",
        description:
          "contrasts financial philosophies providing insights into wealth building strategies and the mindset for financial success",
        price: 80,
        category: "Motivational",
        userID: 1,
        imgLink: "Resources/Images/books/AtomicHabits.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 10,
        title: "Good to Great",
        author: "James C Collins",
        description:
          "reveals how exceptional companies achieve sustained greatness through visionary leadership and disciplined processes",
        price: 186,
        category: "Motivational",
        userID: 1,
        imgLink: "Resources/Images/books/GoodToGreat.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 11,
        title: "The Body Keeps The Score",
        author: "Bessel Van Der Kolk",
        description:
          "delves into the impact of trauma on the body and mind providing insights and therapeutic approaches for healing",
        price: 99,
        category: "Motivational",
        userID: 1,
        imgLink: "Resources/Images/books/TheBodyKeepsTheScore.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 12,
        title: "Never Split The Difference",
        author: "Chris Voss",
        description:
          "is a practical guide to negotiation drawing from FBI experiences with tips for success in various negotiations",
        price: 210,
        category: "Motivational",
        userID: 1,
        imgLink: "Resources/Images/books/NeverSplitTheDifference.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 13,
        title: "Men From Mars And Women From Venus",
        author: "John Gray",
        description:
          "delves into the differences in communication and emotional needs between genders providing insights for better relationships",
        price: 222,
        category: "Motivational",
        userID: 1,
        imgLink: "Resources/Images/books/MenFromMarsAndWomenFromVenus.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 14,
        title: "Great by Choice",
        author: "Jim Collins",
        description:
          "explores how successful companies thrive in uncertainty through disciplined decision making and consistent innovation",
        price: 550,
        category: "Motivational",
        userID: 1,
        imgLink: "Resources/Images/books/GreatByChoice.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 15,
        title: "Charlie and the Chocolate Factory",
        author: "Jim Collins",
        description:
          "explores how successful companies thrive in uncertainty through disciplined decision making and consistent innovation",
        price: 550,
        category: "Children",
        userID: 1,
        imgLink: "Resources/Images/books/CharlieAndTheChocolateFactory.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 16,
        title: "The Chalice Of TheGods",
        author: "Rick Riordan",
        description:
          "explores how successful companies thrive in uncertainty through disciplined decision making and consistent innovation",
        price: 320,
        category: "Children",
        userID: 1,
        imgLink: "Resources/Images/books/TheChaliceOfTheGods.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 17,
        title: "The Sea of Monsters",
        author: "Rick Riordan",
        description:
          "Percy Jackson undertakes a perilous quest to the Sea of Monsters to retrieve the Golden Fleece encountering mythical challenges to save his camp and the world",
        price: 350,
        category: "Children",
        userID: 1,
        imgLink: "Resources/Images/books/TheSeaOfMonsters.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 18,
        title: "The Christmas Owl",
        author: "Ellen Kalish",
        description:
          "Experience the beautiful story that captivated the country about a little owl found in the worlds most famous Christmas tree",
        price: 450,
        category: "Children",
        userID: 1,
        imgLink: "Resources/Images/books/TheChristmasOwl.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 19,
        title: "Song for a Whale",
        author: "Lynne Kelly",
        description:
          "A stirring and heart warming tale of a young deaf girl who is determined to make a difference the perfect read for fans of Wonder",
        price: 110,
        category: "Children",
        userID: 1,
        imgLink: "Resources/Images/books/SongForWhale.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 20,
        title: "Winter Turning",
        author: "Tui T Sutherland",
        description:
          "dragons navigate political intrigue and personal challenges during an IceWing succession war in the Wings of Fire series",
        price: 330,
        category: "Children",
        userID: 1,
        imgLink: "Resources/Images/books/WinterTurning.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 21,

        title: "Harry Potter and the Philosophers Stone",
        author: "J K Rowling",
        description:
          "follows young wizard Harry Potter at Hogwarts as he unravels the mystery of the Philosophers Stone and confronts the dark wizard Lord Voldemort",
        price: 410,
        category: "Children",
        userID: 1,
        imgLink: "Resources/Images/books/HarryPotterandthePhilosopher.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 22,
        title: "Guns Germs and Steel",
        author: "Jared Diamond",
        description:
          "analyzes how geography and agriculture have shaped human history and global inequalities",
        price: 210,
        category: "History",
        userID: 1,
        imgLink: "Resources/Images/books/GunsGermsAndSteel.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 23,
        title: "The Warmth of Other Suns",
        author: "Isabel Wilkerson ",
        description:
          "explores the Great Migration detailing the significant journeys of African Americans from the Southern US to the North and West",
        price: 610,
        category: "History",
        userID: 1,
        imgLink: "Resources/Images/books/TheWarmthOfOtherSuns.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 24,
        title: "Alexander Hamilton",
        author: "biographer Ron Chernow",
        description:
          "detailed biography chronicling the life and significant contributions of this Founding Father to the shaping of the United States",
        price: 210,
        category: "History",
        userID: 1,
        imgLink: "Resources/Images/books/AlexanderHamilton.jpeg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 25,
        title: "The Crusades",
        author: "Thomas Asbridge",
        description:
          "The Crusades is an authoritative accessible single volume history of the brutal struggle for the Holy Land in the Middle Ages",
        price: 410,
        category: "History",
        userID: 1,
        imgLink: "Resources/Images/books/TheCrusades.jpg",
        stockNum: 10,
        bestSeller: true,
        recentlyAdded: false,
      },
      {
        ID: 26,
        title: "The Devil in the White City",
        author: "Erik Larson",
        description:
          "Murder Magic and Madness at the Fair That Changed America is a  historical",
        price: 220,
        category: "History",
        userID: 1,
        imgLink: "Resources/Images/books/TheDevilintheWhiteCity.jpeg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
      {
        ID: 27,
        title: "The Guns of August",
        author: "Barbara W Tuchman",
        description:
          "It is centered on the first month of World War I After introductory chapters Tuchman describes in great detail the opening events of the conflict",
        price: 310,
        category: "History",
        userID: 1,
        imgLink: "Resources/Images/books/TheGunsofAugust.jpg",
        stockNum: 10,
        bestSeller: true,
        recentlyAdded: false,
      },
      {
        ID: 28,
        title: "The Lessons of History",
        author: "Ariel Durant",
        description:
          "The book provides a summary of periods and trends in history they had noted upon completion of the 10th volume",
        price: 510,
        category: "History",
        userID: 1,
        imgLink: "Resources/Images/books/TheLessonsofHistory.jpg",
        stockNum: 10,
        bestSeller: false,
        recentlyAdded: true,
      },
    ])
  );
}
function populateAllOrders() {
  localStorage.setItem(
    "allOrders",
    JSON.stringify([
      {
        orderId: 1,
        userId: 3,
        status: "completed",
        total: 753.1,
        items: [
          {
            ID: 1,
            sellerId: 2,
            name: "Rich Dad And Poor Dad",
            price: 110,
            quantity: 2,
            imgLink: "Resources/Images/books/RichDadAndPoorDad.jpg",
            bookId: 8,
          },
          {
            ID: 2,
            sellerId: 6,
            name: "Men From Mars And Women From Venus",
            price: 222,
            quantity: 3,
            imgLink: "Resources/Images/books/MenFromMarsAndWomenFromVenus.jpg",
            bookId: 13,
          },
        ],
        date: "2024-02-11T19:57:24.166Z",
      },
      {
        orderId: 2,
        userId: 5,
        status: "pending",
        total: 864,
        items: [
          {
            ID: 1,
            sellerId: 2,
            name: "Murder On The Orient Express",
            price: 340,
            quantity: 1,
            imgLink: "Resources/Images/books/MurderOnTheOrientExpress.jpeg",
            bookId: 5,
          },
          {
            ID: 2,
            sellerId: 2,
            name: "We Free The Stars",
            price: 150,
            quantity: 2,
            imgLink: "Resources/Images/books/WeFreeTheStars.jpg",
            bookId: 6,
          },
          {
            ID: 3,
            sellerId: 6,
            name: "The Chalice Of TheGods",
            price: 320,
            quantity: 1,
            imgLink: "Resources/Images/books/TheChaliceOfTheGods.jpg",
            bookId: 16,
          },
        ],
        date: "2024-02-11T20:00:48.390Z",
      },
      {
        orderId: 3,
        userId: 4,
        status: "pending",
        items: [
          {
            ID: 1,
            sellerId: 6,
            name: "Abu Alhoul",
            price: 115,
            quantity: 1,
            imgLink: "Resources/Images/books/abuAlhoulBook.jpg",
            bookId: 1,
          },
        ],
        date: "2024-02-11T20:03:04.623Z",
      },
    ])
  );
}
function populateOrder() {
  localStorage.setItem(
    "orders",
    JSON.stringify([
      {
        orderId: 1,
        userId: 4,
        status: "pending",
        items: [
          {
            ID: 1,
            sellerId: 2,
            name: "Tale of Two Cities",
            price: 135,
            quantity: 1,
            imgLink: "Resources/Images/books/TaleofTwoCities.jpg",
          },
        ],
      },
    ])
  );
}
function populateSellerOrders() {
  localStorage.setItem(
    "sellerOrders",
    JSON.stringify([
      {
        orderId: 1,
        userId: 3,
        bookID: 2,
        bookName: "The final Gambit",
        bookPrice: 125,
        bookQuantity: 4,
        imgLink: "Resources/Images/books/TheFinalGambit.jpg",
        date: "2024-01-27T14:00:09.892Z",
        status: "pending",
      },
      {
        orderId: 1,
        userId: 3,
        bookID: 3,
        bookName: "Abu Alhoul",
        bookPrice: 115,
        bookQuantity: 3,
        imgLink: "Resources/Images/books/abuAlhoulBook.jpg",
        date: "2024-01-27T14:00:09.892Z",
        status: "pending",
      },
      {
        orderId: 2,
        userId: 3,
        bookID: 1,
        bookName: "Tale of Two Cities",
        bookPrice: 135,
        bookQuantity: 2,
        imgLink: "Resources/Images/books/TaleofTwoCities.jpg",
        date: "2024-01-27T14:01:32.371Z",
        status: "pending",
      },
      {
        orderId: 3,
        userId: 4,
        bookID: 1,
        bookName: "Tale of Two Cities",
        bookPrice: 135,
        bookQuantity: 2,
        imgLink: "Resources/Images/books/TaleofTwoCities.jpg",
        date: "2024-01-27T14:01:32.371Z",
        status: "pending",
      },
      {
        orderId: 4,
        userId: 3,
        status: "pending",
        items: [
          {
            ID: 5,
            sellerId: 2,
            name: "Murder On The Orient Express",
            price: 340,
            quantity: 1,
            imgLink: "Resources/Images/books/MurderOnTheOrientExpress.jpeg",
          },
        ],
      },
    ])
  );
}

export function populateAllData() {
  populateAllUsers();
  populateAllBooks();
  populateAllOrders();
  populateMyBooks();
  //when seller go to dashboard
  //populateSellerOrders();
}

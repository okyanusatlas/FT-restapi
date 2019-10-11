const contacts = [
    {
        id: 0,
        firstname: "Okyanus",
        lastname: "Atlas",
        email: "okyanus.atlas@outlook.com",
        marketingPreferences: [
            {
                id:0,
                brandName: "myBrand",
                channel: "email",
                optInStatus: true
            },
            {
                id:1,
                brandName: "mySecondBrand",
                channel: "phone",
                optInStatus: false
            }
        ]
    }
];

module.exports = {contacts};
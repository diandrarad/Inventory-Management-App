const mongoose = require("mongoose")
const Category = require("./models/category")
const Item = require("./models/item")

const mongoDB = process.argv[2] || 'mongodb://localhost/inventory' // MongoDB connection string

const seedData = {
  categories: [
    { name: "Electronics", description: "Electronic devices", url: "https://res.cloudinary.com/dmruuavca/image/upload/v1712221184/jbq8aus0t6vsi9wgtydw.jpg" },
    { name: "Clothing", description: "Apparel and fashion", url: "https://www.liveabout.com/thmb/DGBwIGsAQbVWtnF4e7xCfSE3Wcw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Stocksy_txp9c97647dmQ8300_Medium_2248487-20849b24b9204064a89551515e717c2f.jpg" },
    { name: "Books", description: "Various genres of books", url: "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149330605.jpg" },
    { name: "Home Decor", description: "Decorative items for home", url: "https://www.thefreecloset.com/wp-content/uploads/2023/07/Modern-Mexican-Home-Decor-Mexican-decor-living-room.jpg" },
    { name: "Sports Equipment", description: "Equipment for various sports", url: "https://hips.hearstapps.com/hmg-prod/images/horizon-treadmill-2-0213-1-preview-maxwidth-3000-maxheight-3000-ppi-300-quality-90-1-1610492343.jpg?crop=0.668xw:1.00xh;0.0578xw,0" }
  ],
  items: [
    // Electronics
    { name: "Laptop", description: "Powerful laptop for work and gaming", category: "/electronics", price: 999.99, numberInStock: 10, url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/9/22/f3842560-eb2b-4b73-96b6-85b1d4f7d58d.jpg" },
    { name: "Headphones", description: "High-quality headphones for immersive audio experience", category: "/electronics", price: 149.99, numberInStock: 20, url: "https://us.soundcore.com/cdn/shop/files/20230907-202804.jpg" },
    { name: "Smartphone", description: "Feature-rich smartphone for everyday use", category: "/electronics", price: 699.99, numberInStock: 15, url: "https://images-cdn.ubuy.co.in/634d031dba8fe623b47893cc-smart-phone-android-8-1-smartphone-hd.jpg" },
    { name: "Tablet", description: "Portable tablet for entertainment and productivity", category: "/electronics", price: 299.99, numberInStock: 25, url: "https://images.tokopedia.net/img/cache/700/OJWluG/2023/6/23/839556f7-0d63-4390-9531-fe06ad04e317.jpg" },
    { name: "Smartwatch", description: "Sleek smartwatch for fitness and notifications", category: "/electronics", price: 199.99, numberInStock: 30, url: "https://upload.jaknot.com/2022/09/images/products/286ad3/original/skmei-smartwatch-sport-fitness-tracker-heart-rate-t55.jpg" },

    // Clothing
    { name: "Jeans", description: "Classic denim jeans for everyday wear", category: "/clothing", price: 39.99, numberInStock: 50, url: "https://lsco.scene7.com/is/image/lsco/A60810003-alt2-pdp-lse?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,1&op_usm=1.25,0.6,8&wid=2000&hei=1800" },
    { name: "Dress Shirt", description: "Formal dress shirt for professional occasions", category: "/clothing", price: 29.99, numberInStock: 40, url: "https://assets.vogue.com/photos/60184cbb4a29d5a7ff3a3588/master/w_1600%2Cc_limit/VO0121_Collections_01.jpg" },
    { name: "Sneakers", description: "Stylish sneakers for casual outings", category: "/clothing", price: 59.99, numberInStock: 30, url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/1/31/bcf374d8-f00d-4562-ad08-3b7486e25064.jpg" },
    { name: "Hoodie", description: "Cozy hoodie for chilly days", category: "/clothing", price: 49.99, numberInStock: 35, url: "https://img.lazcdn.com/g/p/0c9ce67288ec5573f9db09d0c48f9412.jpg_720x720q80.jpg" },
    { name: "Skirt", description: "Fashionable skirt for versatile styling", category: "/clothing", price: 34.99, numberInStock: 45, url: "https://di2ponv0v5otw.cloudfront.net/posts/2022/06/30/62bdee94706ac18cfbfcb0fe/m_62bdf0ad920786b40843d8ea.jpeg" },

    // Books
    { name: "Thriller Novel", description: "Suspenseful thriller novel for gripping reads", category: "/books", price: 14.99, numberInStock: 20, url: "https://i5.walmartimages.com/asr/90b12b1a-6613-4ea4-b444-80c71883b058.c95d824652fc99442f0aa1cf6fc2a00d.jpeg?odnHeight=320&odnWidth=320&odnBg=FFFFFF" },
    { name: "Cookbook", description: "Collection of delicious recipes for home cooking", category: "/books", price: 24.99, numberInStock: 15, url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/8/14/d7645459-033a-4904-9a93-ae0ac1ee5c0c.jpg" },
    { name: "Self-Help Book", description: "Inspirational self-help book for personal growth", category: "/books", price: 19.99, numberInStock: 25, url: "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/12/2/072ad152-578c-4699-8c09-c733b587ea04.jpg" },
    { name: "Science Fiction Novel", description: "Fascinating science fiction novel for imaginative minds", category: "/books", price: 16.99, numberInStock: 30, url: "https://cdn.vox-cdn.com/thumbor/C9UDvoBDt5ouggCjcP9kw3hpH1w=/0x0:1019x1024/1400x1400/filters:focal(510x512:511x513)/cdn1.vox-cdn.com/uploads/chorus_asset/file/7757779/new_books.png" },
    { name: "Biography", description: "Compelling biography of an influential figure", category: "/books", price: 18.99, numberInStock: 18, url: "https://cdn.kobo.com/book-images/de669ae8-aca7-408f-9664-bcc95a8325cc/1200/1200/False/albert-einstein-the-genius-who-failed-school-biography-book-best-sellers-children-s-biography-books.jpg" },

    // Home Decor
    { name: "Wall Art", description: "Beautiful wall art for enhancing living spaces", category: "/home-decor", price: 49.99, numberInStock: 20, url: "https://images-cdn.ubuy.co.id/65090d696a7f7700b74c8c00-ainydie-3d-metal-wall-art-decor.jpg" },
    { name: "Throw Pillows", description: "Soft throw pillows for adding comfort and style", category: "/home-decor", price: 19.99, numberInStock: 25, url: "https://img.fruugo.com/product/5/22/208492225_max.jpg" },
    { name: "Candles", description: "Scented candles for creating a cozy ambiance", category: "/home-decor", price: 9.99, numberInStock: 30, url: "https://m.media-amazon.com/images/I/81z-g9rGkWL._AC_UF894,1000_QL80_.jpg" },
    { name: "Rug", description: "Elegant rug for defining spaces and adding warmth", category: "/home-decor", price: 79.99, numberInStock: 15, url: "https://m.media-amazon.com/images/I/81bj9ryWOLL._AC_UF894,1000_QL80_.jpg" },
    { name: "Decorative Mirror", description: "Chic decorative mirror for enhancing decor", category: "/home-decor", price: 69.99, numberInStock: 10, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQET3iM1IBTA4DeI8bwIP1_W0bNla4XfFiRrIJFVW8Gc4EUk9FLiDX5bqdcCN2XT23Z8E&usqp=CAU" },

    // Sports Equipment
    { name: "Yoga Mat", description: "Durable yoga mat for practicing yoga and meditation", category: "/sports-equipment", price: 29.99, numberInStock: 25, url: "https://contents.mediadecathlon.com/p2121919/k$6edab0d3eda09bbff35704a46b4e0e2f/light-yoga-mat-5-mm-v2-grey.jpg" },
    { name: "Dumbbells", description: "Pair of dumbbells for strength training workouts", category: "/sports-equipment", price: 39.99, numberInStock: 20, url: "https://www.ritfitsports.com/cdn/shop/products/ritfit-rubber-hex-dumbbell-set-10-60-lbs-weight-ritfit-613242.jpg" },
    { name: "Jump Rope", description: "Adjustable jump rope for cardio exercises", category: "/sports-equipment", price: 14.99, numberInStock: 30, url: "https://www.gaiam.com/cdn/shop/products/05-64484_GAIAM-WEIGHTED-JUMP-ROPE_A.jpg" },
    { name: "Tennis Racket", description: "High-quality tennis racket for tennis enthusiasts", category: "/sports-equipment", price: 79.99, numberInStock: 15, url: "https://ae01.alicdn.com/kf/S04f34e4813f14cbca87b41864ba9ac0eR.jpg_640x640Q90.jpg_.webp" },
    { name: "Basketball", description: "Official basketball for basketball games", category: "/sports-equipment", price: 29.99, numberInStock: 25, url: "https://www.pacersteamstore.com/cdn/shop/products/9330060002_A.jpg" }
  ]
}

run()

async function run() {
  try {
    await mongoose.connect(mongoDB)
    console.log("Connected to MongoDB")

    // Seed categories
    await Category.deleteMany() // Clear existing categories
    const categories = await Category.create(seedData.categories)
    console.log(`Seeded ${categories.length} categories`)

    // Seed items
    await Item.deleteMany() // Clear existing items
    seedData.items.forEach(item => {
      const categoryName = item.category.toLowerCase().replace('/', '').replace('-', ' ')
      const category = categories.find(category => category.name.toLowerCase() === categoryName)

      if (category) item.category = category._id
      else console.error(`Category not found for item: ${item.name}`)
    })
    const items = await Item.create(seedData.items)
    console.log(`Seeded ${items.length} items`)

    mongoose.connection.close()
    console.log("Database seeding completed")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}
const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();
const { csvParse, csvUnparse, streamToText } = require('./helper')

const movieBlobsNames = {
  snacks: 'Snacks_1.csv',
  booking: 'booking.csv',
  customer: 'customer.csv',
  movies: 'moviesdatabase.csv',
  snack_booking: 'snack_booking.csv',
  theatre: 'theatre.csv',
  ticket: 'ticket.csv'
}

const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=bookingsystemblob;AccountKey=axtXx4YFJdrOgT2Lj84xn/SfEEocVi0k8pc9hTpc9rG8xnVpM+CoZVG3hui4R7ehKQZ/aPBb/mAO+AStWldpAA==;EndpointSuffix=core.windows.net'
// Create the BlobServiceClient object with connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);

// Get a reference to a container
const movieContainer = blobServiceClient.getContainerClient('movie-system');

const snacksClient = movieContainer.getBlockBlobClient(movieBlobsNames.snacks)
const bookingClient = movieContainer.getBlockBlobClient(movieBlobsNames.booking)
const customerClient = movieContainer.getBlockBlobClient(movieBlobsNames.customer)
const moviesClient = movieContainer.getBlockBlobClient(movieBlobsNames.movies)
const snackBookingClient = movieContainer.getBlockBlobClient(movieBlobsNames.snack_booking)
const theatreClient = movieContainer.getBlockBlobClient(movieBlobsNames.theatre)
const ticketClient = movieContainer.getBlockBlobClient(movieBlobsNames.ticket)

async function getDataFromBlob(blobClient = snacksClient) {
  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await blobClient.download(0);
  console.log('\nDownloaded blob content...' + blobClient.name);
  const dataText = await streamToText(downloadBlockBlobResponse.readableStreamBody)

  const objectsData = await csvParse(dataText)
  console.log(objectsData);
  return objectsData

}

async function uploadDataToBlob(blobClient = snacksClient, data) {
    // Create a unique name for the blob
  const blobName = 'test.csv';

  const uploadData = csvUnparse(data)

  // Display blob name and url
  console.log(
    `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blobClient.url}`
  );

  console.log(uploadData);

  // Upload data to the blob
  const uploadBlobResponse = await blobClient.upload(uploadData, uploadData.length);
  console.log(
    `Blob was uploaded successfully.`
  );
}


async function main() {
  try {
    console.log("Azure Blob storage v12 - JavaScript quickstart sample");

    // Quick start code goes here

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error('Azure Storage Connection string not found');
  }


  // const snacksData = await getDataFromBlob(snackBookingClient)
  // snacksData.push({id: '10', quantity: '2', snack_id: '21', booking_id: '4'})
  // await uploadDataToBlob(snackBookingClient, snacksData)

  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
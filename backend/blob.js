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

const client = {
  snacks: movieContainer.getBlockBlobClient(movieBlobsNames.snacks),
  booking: movieContainer.getBlockBlobClient(movieBlobsNames.booking),
  customer: movieContainer.getBlockBlobClient(movieBlobsNames.customer),
  movies: movieContainer.getBlockBlobClient(movieBlobsNames.movies),
  snackBooking: movieContainer.getBlockBlobClient(movieBlobsNames.snack_booking),
  theatre:  movieContainer.getBlockBlobClient(movieBlobsNames.theatre),
  ticket: movieContainer.getBlockBlobClient(movieBlobsNames.ticket)
}

async function getDataFromBlob(blobClient = client.snacks) {
  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await blobClient.download(0);
  console.log('Downloading blob content...' + blobClient.name);
  const dataText = await streamToText(downloadBlockBlobResponse.readableStreamBody)

  const objectsData = await csvParse(dataText)
  // console.log(objectsData);
  return objectsData

}

/**
 * @param data array of objects
 */
async function uploadDataToBlob(blobClient = client.snacks, data) {
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

module.exports = { getDataFromBlob, uploadDataToBlob, client}

// const snacksData = await getDataFromBlob(snackBookingClient)
// snacksData.push({id: '10', quantity: '2', snack_id: '21', booking_id: '4'})
// await uploadDataToBlob(snackBookingClient, snacksData)

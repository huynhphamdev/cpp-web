const { execSync } = require('child_process')

const s3Region = 'ap-southeast-1'
const s3Path = 'huynhpham-learning-platform'
const cloudFrontDistId = 'EVUXY4772UC4X'

const run = async (command) => {
  console.log(command)
  const stdout = execSync(command)
  console.log(stdout.toString())
}

const uploadS3 = async () => {
  await run (`aws s3 sync dist/ s3://${s3Path} --delete --region ${s3Region} --profile learning-platform`)
}

const invalidateCache = async () => {
  await run(`aws cloudfront create-invalidation --distribution-id ${cloudFrontDistId} --paths "/index.html"  --profile learning-platform`)
}

// Build and deploy the app to Firebase

async function deploy() {
  await uploadS3()
  await invalidateCache()
}

deploy().then(() => console.log('Deploy success!'))

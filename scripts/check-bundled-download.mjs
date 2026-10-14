import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
const release=JSON.parse(await readFile('lib/mobile/android-release.json','utf8'))
const origin=process.env.CHECK_ORIGIN||'http://localhost:3100'
assert.ok(release.available)
const page=await fetch(origin+'/downloads')
assert.equal(page.status,200)
const html=await page.text()
assert.ok(html.includes(`href="${release.url}"`),'Download link must use the bundled same-origin URL')
assert.ok(html.includes(`download="${release.filename}"`),'Download attribute must name the actual APK')
assert.ok(html.includes('Download Android APK'))
assert.ok(html.includes('Android beta'))
const apk=await fetch(origin+release.url)
assert.equal(apk.status,200)
assert.ok(apk.headers.get('content-type')?.includes('android.package-archive'))
assert.equal(Number(apk.headers.get('content-length')),release.sizeBytes)
const hash=createHash('sha256');let bytes=0
for await(const chunk of apk.body){hash.update(chunk);bytes+=chunk.length}
assert.equal(bytes,release.sizeBytes)
assert.equal(hash.digest('hex'),release.checksum)
console.log(`PASS: download button, same-origin APK, download filename, APK MIME type, ${bytes} bytes and exact SHA-256.`)

import { NextApiRequest, NextApiResponse } from "next";

export default async function PassportLogin(req: NextApiRequest, res: NextApiResponse) {
    res.json({
        access_token: "eyJhbGciOiJSUzI1NiJ9.eyJsYXN0TmFtZSI6IndpY2siLCJmaXJzdExvZ2luIjpmYWxzZSwidXNlcl9uYW1lIjoiam9obndpY2tAbWFpbGluYXRvci5jb20iLCJtb2JpbGVObyI6IjIzNDkwNjY0Mzk5ODMiLCJlbnYiOiJURVNUIiwiY2xpZW50X2Rlc2NyaXB0aW9uIjpudWxsLCJjbGllbnRfaWQiOiJJS0lBRjJBMzc3MDA0Q0Q4RkVENjExMDkyRTc4OEIxRTJFNzNFQ0Q2RTIyQSIsImZpcnN0TmFtZSI6IkpvaG4iLCJlbWFpbFZlcmlmaWVkIjpmYWxzZSwiYXVkIjpbImFwaS1nYXRld2F5IiwiZWNoYW5nZS1zZXJ2aWNlIiwiaXN3LWNvcmUiLCJwYXNzcG9ydCIsInZlcnZlbGlmZS1zZXJ2aWNlIl0sInNlbmRlciI6ImFwaS1nYXRld2F5LWNsaWVudCIsInNjb3BlIjpbImNsaWVudHMiXSwiZXhwIjozMjE1NDc4NDg0LCJtb2JpbGVOb1ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50X25hbWUiOiJBUEkgLSBHYXRld2F5IiwiY2xpZW50X2xvZ28iOm51bGwsImp0aSI6IjMzOWQzNzM1LTJlNzctNDdmZC1iMTdjLTZjMjYzNjE0MDA0YSIsImVtYWlsIjoiam9obndpY2tAbWFpbGluYXRvci5jb20iLCJwYXNzcG9ydElkIjoiOUIzNTJFNUMtMEI1Mi00RTcwLUE0NjMtNDE3RkVERENEMjNDIn0.eUOz2yAc5oxOMJT6QveSSUqjOkbpi3JUiuOfPsWu2y64r9c0FOHJcvq3VxxDlpR9T7paT9IfIBGptoPRhOxFnYJLFSU9NY1FDH0IoVAznVT_Zg7mgP5HMo5tqFMs3LLWHA7sOT3r2OxNW7cpY3C1wNZxIatGFaqxBhIjdhiuMiaYzuc6HK8I1Sdu7KUJqhrMI1NpQKFFbsQwiotPKcESDrLboGfNkbnR-_1m1gcK7Cees-xeB6brWTc6zHqcmv2f71Gz-QX7n-RKFdr_8cudHInz6GNsfcQpYwjG7HeLROpjMBw2YjC_Q60MQbN6yTVkNDrymsWm5TJMxtqAhjcqMA"
    })
}
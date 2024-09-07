

test(`Learn frames`,async({page})=>{
    await page.goto("https://www.leafground.com/frame.xhtml")  
    const frameEle= page.frame({url:`https://www.leafground.com/default.xhtml`})
    const eleinFrame= frameEle?.locator("#Click");
    console.log(await eleinFrame?.innerText())
    await eleinFrame?.click();
    console.log(await eleinFrame?.innerText())

     const allFrames=page.frames();
     await allFrames[4].click("#Click");

})

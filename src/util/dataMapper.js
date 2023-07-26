

export function dataMapper(fireData, countyData) {
    const data = fireData.map((fire) => {
        const year = parseInt(fire.Year)
        const month = parseInt(fire.Month)
        const fireSize = parseFloat(fire.Fire_Size)
        const county = countyData.features.find((county) => county.id == fire.County_Id)
        const id = fire.County_Id
        return {year, month, fireSize, county, id}
    })
    return data;

  }
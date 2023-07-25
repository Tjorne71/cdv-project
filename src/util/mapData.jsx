import wildfireDataJson from "@/data/FiresPerCountyMonthly.json";

export default class MapData {
  constructor() {
    const wildfireData = wildfireDataJson;
    this.wildfire1992 = wildfireData.filter((fire) => fire.Year === "1992");
    this.wildfire1993 = wildfireData.filter((fire) => fire.Year === "1993");
    this.wildfire1994 = wildfireData.filter((fire) => fire.Year === "1994");
    this.wildfire1995 = wildfireData.filter((fire) => fire.Year === "1995");
    this.wildfire1996 = wildfireData.filter((fire) => fire.Year === "1996");
    this.wildfire1997 = wildfireData.filter((fire) => fire.Year === "1997");
    this.wildfire1998 = wildfireData.filter((fire) => fire.Year === "1998");
    this.wildfire1999 = wildfireData.filter((fire) => fire.Year === "1999");
    this.wildfire2000 = wildfireData.filter((fire) => fire.Year === "2000");
    this.wildfire2001 = wildfireData.filter((fire) => fire.Year === "2001");
    this.wildfire2002 = wildfireData.filter((fire) => fire.Year === "2002");
    this.wildfire2003 = wildfireData.filter((fire) => fire.Year === "2003");
    this.wildfire2004 = wildfireData.filter((fire) => fire.Year === "2004");
    this.wildfire2005 = wildfireData.filter((fire) => fire.Year === "2005");
    this.wildfire2006 = wildfireData.filter((fire) => fire.Year === "2006");
    this.wildfire2007 = wildfireData.filter((fire) => fire.Year === "2007");
    this.wildfire2008 = wildfireData.filter((fire) => fire.Year === "2008");
    this.wildfire2009 = wildfireData.filter((fire) => fire.Year === "2009");
    this.wildfire2010 = wildfireData.filter((fire) => fire.Year === "2010");
    this.wildfire2011 = wildfireData.filter((fire) => fire.Year === "2011");
    this.wildfire2012 = wildfireData.filter((fire) => fire.Year === "2012");
    this.wildfire2013 = wildfireData.filter((fire) => fire.Year === "2013");
    this.wildfire2014 = wildfireData.filter((fire) => fire.Year === "2014");
    this.wildfire2015 = wildfireData.filter((fire) => fire.Year === "2015");
  }
}

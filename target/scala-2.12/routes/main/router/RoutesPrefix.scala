
// @GENERATOR:play-routes-compiler
// @SOURCE:C:/Users/jorge/IdeaProjects/WebDPWManager/conf/routes
// @DATE:Tue Sep 19 12:02:10 PYT 2017


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}

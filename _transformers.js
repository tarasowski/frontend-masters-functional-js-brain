// F -> G -> M
const Compose = (F, G) => {
  const M = fg => ({
    extract: () => fg,
    map: f => M(fg.map(g => g.map(f)))
  })
  M.of = x => M(F.of(G.of(x)))
  return M
} 

// functors compose but monads do not
const FlutureEither = Compose(Task, Either)


FlutureEither.of(2)
  .map(two => two * 10)
  .map(twenty => twenty + 1)
  .extract()
  .fork (console.error) (either => either.fold(console.log, console.log)
  )





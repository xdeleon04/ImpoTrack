using ImpoTrack.Tests.Helpers;

namespace ImpoTrack.Tests
{
    public class AppDbContextTests
    {
        [Fact]
        public async Task GetContribuyentes_ReturnsContribuyentes()
        {
            await using var context = new MockDb().CreateDbContext();

            context.Contribuyentes.Add(new Contribuyente {
                ContribuyenteId = 1,
                RncCedula = "98754321012",
                Nombre = "JUAN PEREZ",
                Tipo = "PERSONA FISICA",
                Estatus = "Activo"
            });

            await context.SaveChangesAsync();

            var contribuyentes = context.Contribuyentes.ToList();

            Assert.Single(contribuyentes);
            Assert.Equal("98754321012", contribuyentes[0].RncCedula);
        }

        [Fact]
        public async Task GetComprobantesFiscales_ReturnsComprobantesFiscales()
        {
            await using var context = new MockDb().CreateDbContext();

            context.ComprobantesFiscales.Add(new ComprobanteFiscal {
                ComprobanteId = 1,
                RncCedula = "98754321012",
                NCF = "E310000000001",
                Monto = 200.00,
                Itbis18 = 36.00
            });

            await context.SaveChangesAsync();

            var comprobantesFiscales = context.ComprobantesFiscales.ToList();

            Assert.Single(comprobantesFiscales);
            Assert.Equal("E310000000001", comprobantesFiscales[0].NCF);
        }
    }
}
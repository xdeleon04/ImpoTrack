namespace ImpoTrack.Server
{
    public class Contribuyente
    {
        [Key]
        public int ContribuyenteId { get; set; }
        public string? RncCedula { get; set; }
        public string? Nombre { get; set; }
        public string? Tipo { get; set; }
        public string? Estatus { get; set; }
    }
}
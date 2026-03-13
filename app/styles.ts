import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  button: {
    backgroundColor: "#007bff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  indexContainer: {
    flex: 1,
    backgroundColor: "#0c40a0",
    padding: 28,
    paddingTop: 70,
  },

  indexBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#f0b429",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },

  indexBadgeText: {
    color: "#0f1f3d",
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 1.5,
  },

  indexTitle: {
    fontSize: 42,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 8,
  },

  indexSubtitle: {
    fontSize: 15,
    color: "#7a9cc8",
    marginBottom: 40,
  },

  indexCard: {
    borderRadius: 16,
    padding: 22,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  indexCardProgramas: {
    backgroundColor: "#1a56db",
  },

  indexCardEstudiantes: {
    backgroundColor: "#0d9488",
  },

  indexCardEmoji: {
    fontSize: 32,
    color:"white"
  },

  indexCardBody: {
    flex: 1,
  },

  indexCardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },

  indexCardDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
  },

  indexCardArrow: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 22,
  },

  backBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#e8eef8",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 16,
  },

  backBtnText: {
    color: "#1a3a6d",
    fontWeight: "700",
    fontSize: 14,
  },

  fila: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 10,
  },

  seleccionadoText: {
    backgroundColor: "#d4edda",
    borderColor: "#28a745",
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
    color: "#155724",
    fontWeight: "bold",
  },

  itemSeleccionado: {
    backgroundColor: "#cce5ff",
    borderColor: "#007bff",
    borderWidth: 2,
  },

  itemCod: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#1a1a2e",
  },

  itemNombre: {
    color: "#555",
    fontSize: 13,
    marginTop: 2,
  },

  itemPrograma: {
    color: "#007bff",
    fontSize: 12,
    marginTop: 2,
  },

  inputDeshabilitado: {
    backgroundColor: "#e9e9e9",
    borderColor: "#bbb",
    color: "#888",
  },

  btnCrear:     { backgroundColor: "#28a745" },
  btnModificar: { backgroundColor: "#007bff" },
  btnEliminar:  { backgroundColor: "#dc3545" },
  btnLimpiar:   { backgroundColor: "#6c757d" },
  btnBuscar:    { backgroundColor: "#17a2b8" },

  hint: {
    color: "#888",
    fontSize: 12,
    marginBottom: 8,
    fontStyle: "italic",
  },

});
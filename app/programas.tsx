import { View, Text, TextInput, Pressable, FlatList, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { db } from "./database";
import { styles } from "./styles";

export default function Programas() {

  const router = useRouter();
  const [cod, setCod] = useState("");
  const [nombre, setNombre] = useState("");
  const [buscar, setBuscar] = useState("");
  const [lista, setLista] = useState<any[]>([]);
  const [seleccionado, setSeleccionado] = useState<string | null>(null);

  function seleccionar(item: any) {
    setCod(item.cod);
    setNombre(item.nombre);
    setSeleccionado(item.cod);
  }

  function limpiar() {
    setCod("");
    setNombre("");
    setSeleccionado(null);
  }

  async function crear() {
    if (!cod || !nombre) {
      Alert.alert("Error", "Ingresa código y nombre");
      return;
    }
    try {
      await db.runAsync("INSERT INTO programas (cod, nombre) VALUES (?, ?)", cod, nombre);
      limpiar();
      cargar();
    } catch {
      Alert.alert("Error", "El código ya existe");
    }
  }

  async function modificar() {
    if (!seleccionado) {
      Alert.alert("Aviso", "Toca un programa de la lista para seleccionarlo");
      return;
    }
    if (!nombre) {
      Alert.alert("Error", "Ingresa el nuevo nombre");
      return;
    }
    await db.runAsync("UPDATE programas SET nombre = ? WHERE cod = ?", nombre, seleccionado);
    limpiar();
    cargar();
  }

  async function eliminar() {
    if (!seleccionado) {
      Alert.alert("Aviso", "Toca un programa de la lista para seleccionarlo");
      return;
    }
    const res: any = await db.getFirstAsync(
      "SELECT COUNT(*) as total FROM estudiantes WHERE programa_cod = ?",
      seleccionado
    );
    if (res.total > 0) {
      Alert.alert("No permitido", "Este programa tiene estudiantes asignados");
      return;
    }
    Alert.alert("Confirmar", `¿Eliminar "${nombre}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar", style: "destructive",
        onPress: async () => {
          await db.runAsync("DELETE FROM programas WHERE cod = ?", seleccionado);
          limpiar();
          cargar();
        }
      }
    ]);
  }

  async function cargar() {
    const datos = await db.getAllAsync(
      `SELECT * FROM programas WHERE cod LIKE ? OR nombre LIKE ?`,
      `%${buscar}%`, `%${buscar}%`
    );
    setLista(datos as any[]);
  }

  return (
    <View style={styles.container}>

      {/* Botón volver */}
      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>← Volver</Text>
      </Pressable>

      <Text style={styles.title}>Programas</Text>

      {seleccionado && (
        <Text style={styles.seleccionadoText}>
          ✅ Seleccionado: {seleccionado}
        </Text>
      )}

      <TextInput
        style={[styles.input, seleccionado ? styles.inputDeshabilitado : {}]}
        placeholder="Código (4 caracteres)"
        value={cod}
        onChangeText={setCod}
        maxLength={4}
        editable={!seleccionado}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre (máx 30 caracteres)"
        value={nombre}
        onChangeText={setNombre}
        maxLength={30}
      />

      <View style={styles.fila}>
        <Pressable style={[styles.button, styles.btnCrear]} onPress={crear}>
          <Text style={styles.buttonText}>Crear</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.btnModificar]} onPress={modificar}>
          <Text style={styles.buttonText}>Modificar</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.btnEliminar]} onPress={eliminar}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.btnLimpiar]} onPress={limpiar}>
          <Text style={styles.buttonText}>Limpiar</Text>
        </Pressable>
      </View>

      <View style={styles.fila}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Buscar por código o nombre..."
          value={buscar}
          onChangeText={setBuscar}
        />
        <Pressable style={[styles.button, styles.btnBuscar, { marginBottom: 0, marginLeft: 8 }]} onPress={cargar}>
          <Text style={styles.buttonText}>Buscar</Text>
        </Pressable>
      </View>

      <Text style={styles.hint}>👆 Toca un item para seleccionarlo</Text>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.cod}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => seleccionar(item)}
            style={[styles.item, seleccionado === item.cod && styles.itemSeleccionado]}
          >
            <Text style={styles.itemCod}>{item.cod}</Text>
            <Text style={styles.itemNombre}>{item.nombre}</Text>
          </Pressable>
        )}
      />

    </View>
  );
}
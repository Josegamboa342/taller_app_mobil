import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { useEffect } from "react";
import { crearTablas } from "./database";
import { styles } from "./styles";

export default function Home() {

  useEffect(() => {
    crearTablas();
  }, []);

  return (
    <View style={styles.indexContainer}>

      <View style={styles.indexBadge}>
        <Text style={styles.indexBadgeText}>SISTEMA ACADÉMICO</Text>
      </View>

      <Text style={styles.indexTitle}>Universidad</Text>
      <Text style={styles.indexSubtitle}>Selecciona un módulo para continuar</Text>

      <Link href="/programas" asChild>
        <Pressable style={[styles.indexCard, styles.indexCardProgramas]}>
          <Text style={styles.indexCardEmoji}>🎓Programas</Text>
          <View style={styles.indexCardBody}>
            <Text style={styles.indexCardTitle}>Programas</Text>
            <Text style={styles.indexCardDesc}>Gestionar programas académicos</Text>
          </View>
          <Text style={styles.indexCardArrow}>→</Text>
        </Pressable>
      </Link>

      <Link href="/estudiantes" asChild>
        <Pressable style={[styles.indexCard, styles.indexCardEstudiantes]}>
          <Text style={styles.indexCardEmoji}>👨‍🎓Estudiantes</Text>
          <View style={styles.indexCardBody}>
            <Text style={styles.indexCardTitle}>Estudiantes</Text>
            <Text style={styles.indexCardDesc}>Gestionar estudiantes matriculados</Text>
          </View>
          <Text style={styles.indexCardArrow}>→</Text>
        </Pressable>
      </Link>

    </View>
  );
}
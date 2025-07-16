import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const addCategorySchema = z.object({
  title: z.string().min(1, 'Tab name is required'),
});

type AddCategoryForm = z.infer<typeof addCategorySchema>;

interface AddCategoryModalProps {
  onSubmit: (data: { title: string }) => void;
  onCancel: () => void;
}

export function AddCategoryModal({
  onSubmit = () => undefined,
  onCancel = () => undefined,
}: AddCategoryModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCategoryForm>({
    defaultValues: { title: '' },
    resolver: zodResolver(addCategorySchema),
  });

  const handleAdd = (data: AddCategoryForm) => {
    onSubmit({ ...data });
  };

  return (
    <View
      style={{
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        minWidth: 300,
        padding: 24,
      }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
        Add New Category
      </Text>
      <Text style={{ marginBottom: 8 }}>Tab Name</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{
              borderColor: errors.title ? 'red' : '#ccc',
              borderRadius: 8,
              borderWidth: 1,
              marginBottom: 4,
              padding: 10,
            }}
            placeholder="Enter tab name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && (
        <Text style={{ color: 'red', marginBottom: 8 }}>{errors.title.message}</Text>
      )}
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#BC305D',
            borderRadius: 8,
            flex: 1,
            marginRight: 8,
            padding: 12,
          }}
          onPress={handleSubmit(handleAdd)}>
          <Text
            style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
            Add
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#eee',
            borderRadius: 8,
            flex: 1,
            padding: 12,
          }}
          onPress={onCancel}>
          <Text style={{ color: '#333', textAlign: 'center' }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
